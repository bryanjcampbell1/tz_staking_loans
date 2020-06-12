##
## ## Introduction
##
## See the FA2 standard definition:
## <https://gitlab.com/tzip/tzip/-/blob/master/proposals/tzip-12/>
##
## **WARNING:** This script requires the `/dev` version of SmartPy;
## the recommended version is given by the command:
## `./please.sh get_smartpy_recommended_version`.
##
import smartpy as sp
##
## ## Meta-Programming Configuration
##
## The `FA2_config` class holds the meta-programming configuration.
##
class FA2_config:
    def __init__(self,
                 debug_mode                   = False,
                 single_asset                 = False,
                 non_fungible                 = False,
                 add_mutez_transfer           = False,
                 readable                     = True,
                 force_layouts                = True,
                 support_operator             = True,
                 assume_consecutive_token_ids = True,
                 add_permissions_descriptor   = True):

        if debug_mode:
            self.my_map = sp.map
        else:
            self.my_map = sp.big_map
        # The option `debug_mode` makes the code generation use
        # regular maps instead of big-maps, hence it makes inspection
        # of the state of the contract easier.

        self.single_asset = single_asset
        # This makes the contract save some gas and storage by
        # working only for the token-id `0`.

        self.non_fungible = non_fungible
        # Enforce the non-fungibility of the tokens, i.e. the fact
        # that total supply has to be 1.

        self.readable = readable
        # The `readable` option is a legacy setting that we keep around
        # only for benchmarking purposes.
        #
        # User-accounts are kept in a big-map:
        # `(user-address * token-id) -> ownership-info`.
        #
        # For the Babylon protocol, one had to use `readable = False`
        # in order to use `PACK` on the keys of the big-map.

        self.force_layouts = force_layouts
        # The specification requires all interface-fronting records
        # and variants to be *right-combs;* we keep
        # this parameter to be able to compare performance & code-size.

        self.support_operator = support_operator
        # The operator entry-points always have to be there, but there is
        # definitely a use-case for having them completely empty (saving
        # storage and gas when `support_operator` is `False).

        self.assume_consecutive_token_ids = assume_consecutive_token_ids
        # For a previous version of the TZIP specification, it was
        # necessary to keep track of the set of all tokens in the contract.
        #
        # The set of tokens is for now still available; this parameter
        # guides how to implement it:
        # If `true` we don't need a real set of token ids, just to know how
        # many there are.

        self.add_mutez_transfer = add_mutez_transfer
        # Add an entry point for the administrator to transfer tez potentially
        # in the contract's balance.

        self.add_permissions_descriptor = add_permissions_descriptor
        # Add the `permissions_descriptor` entry-point; it is an
        # optional part of the specification and
        # costs gas and storage so we keep the option of not adding it.
        #
        # Note that if `support_operator` is `False`, the
        # permissions-descriptor becomes technically required.

        name = "FA2"
        if debug_mode:
            name += "-debug"
        if single_asset:
            name += "-single_asset"
        if non_fungible:
            name += "-nft"
        if add_mutez_transfer:
            name += "-mutez"
        if not readable:
            name += "-no_readable"
        if not force_layouts:
            name += "-no_layout"
        if not support_operator:
            name += "-no_ops"
        if not assume_consecutive_token_ids:
            name += "-no_toknat"
        if not add_permissions_descriptor:
            name += "-no_perm"
        self.name = name

## ## Auxiliary Classes and Values
##
## The definitions below implement SmartML-types and functions for various
## important types.
##
token_id_type = sp.TNat

class Error_message:
    def token_undefined(): return "TOKEN_UNDEFINED"
    def insufficient_balance(): return "INSUFFICIENT_BALANCE"
    def not_operator(): return "NOT_OPERATOR"
    def not_owner(): return "NOT_OWNER"

## The current type for a batched transfer in the specification is as
## follows:
##
## ```ocaml
## type transfer = {
##   from_ : address;
##   txs: {
##     to_ : address;
##     token_id : token_id;
##     amount : nat;
##   } list
## } list
## ```
##
## This class provides helpers to create and force the type of such elements.
## It uses the `FA2_config` to decide whether to set the right-comb layouts.
class Batch_transfer:
    def __init__(self, config):
        self.config = config
    def get_transfer_type(self):
        tx_type = sp.TRecord(to_ = sp.TAddress,
                             token_id = token_id_type,
                             amount = sp.TNat)
        if self.config.force_layouts:
            tx_type = tx_type.layout(
                ("to_", ("token_id", "amount"))
            )
        transfer_type = sp.TRecord(from_ = sp.TAddress,
                                   txs = sp.TList(tx_type)).layout(
                                       ("from_", "txs"))
        return transfer_type
    def get_type(self):
        return sp.TList(self.get_transfer_type())
    def item(self, from_, txs):
        v = sp.record(from_ = from_, txs = txs)
        return sp.set_type_expr(v, self.get_transfer_type())
##
## `Operator_param` defines type types for the `%update_operators` and
## `%is_operator` entry-points.
class Operator_param:
    def __init__(self, config):
        self.config = config
    def get_type(self):
        t = sp.TRecord(
            owner = sp.TAddress,
            operator = sp.TAddress)
        if self.config.force_layouts:
            t = t.layout(("owner", "operator"))
        return t
    def make(self, owner, operator):
        r = sp.record(owner = owner,
                      operator = operator)
        return sp.set_type_expr(r, self.get_type())
    def is_operator_response_type(self):
        return sp.TRecord(
            operator = self.get_type(),
            is_operator = sp.TBool)
    def make_is_operator_response(self, operator, is_operator):
        return sp.record(operator = operator, is_operator = is_operator)
    def is_operator_request_type(self):
        return sp.TRecord(
            operator = self.get_type(),
            callback = sp.TContract(self.is_operator_response_type()))

## The class `Ledger_key` defines the key type for the main ledger (big-)map:
##
## - In *“Babylon mode”* we also have to call `sp.pack`.
## - In *“single-asset mode”* we can just use the user's address.
class Ledger_key:
    def __init__(self, config):
        self.config = config
    def make(self, user, token):
        user = sp.set_type_expr(user, sp.TAddress)
        token = sp.set_type_expr(token, token_id_type)
        if self.config.single_asset:
            result = user
        else:
            result = sp.pair(user, token)
        if self.config.readable:
            return result
        else:
            return sp.pack(result)

## For now a value in the ledger is just the user's balance. Previous
## versions of the specification required more information; potential
## extensions may require other fields.
class Ledger_value:
    def get_type():
        return sp.TRecord(balance = sp.TNat)
    def make(balance):
        return sp.record(balance = balance)

## The link between operators and the addresses they operate is kept
## in a *lazy set* of `(owner × operator)` values.
##
## A lazy set is a big-map whose keys are the elements of the set and
## values are all `Unit`.
class Operator_set:
    def __init__(self, config):
        self.config = config
    def inner_type(self):
        return sp.TRecord(owner = sp.TAddress,
                          operator = sp.TAddress).layout(("owner", "operator"))
    def key_type(self):
        if self.config.readable:
            return self.inner_type()
        else:
            return sp.TBytes
    def make(self):
        return self.config.my_map(tkey = self.key_type(), tvalue = sp.TUnit)
    def make_key(self, owner, operator):
        metakey = sp.record(owner = owner, operator = operator)
        metakey = sp.set_type_expr(metakey, self.inner_type())
        if self.config.readable:
            return metakey
        else:
            return sp.pack(metakey)
    def add(self, set, owner, operator):
        set[self.make_key(owner, operator)] = sp.unit
    def remove(self, set, owner, operator):
        del set[self.make_key(owner, operator)]
    def is_member(self, set, owner, operator):
        return set.contains(self.make_key(owner, operator))

class Balance_of:
    def request_type():
        return sp.TRecord(
            owner = sp.TAddress,
            token_id = token_id_type)
    def response_type():
        return sp.TList(
            sp.TRecord(
                request = Balance_of.request_type(),
                balance = sp.TNat))

class Total_supply:
    def request_type():
        return token_id_type
    def response_type():
        return sp.TList(
            sp.TRecord(
                token_id = token_id_type,
                total_supply = sp.TNat))

class Token_meta_data:
    def __init__(self, config):
        self.config = config
    def get_type(self):
        t = sp.TRecord(
            token_id = token_id_type,
            symbol = sp.TString,
            name = sp.TString,
            decimals = sp.TNat,
            extras = sp.TMap(sp.TString, sp.TInt)
        )
        if self.config.force_layouts:
            t = t.layout(("token_id",
                          ("symbol",
                           ("name",
                            ("decimals", "extras")))))
        return t
    def set_type_and_layout(self, expr):
        sp.set_type(expr, self.get_type())
    def request_type(self):
        return Total_supply.request_type()

class Permissions_descriptor:
    def __init__(self, config):
        self.config = config
    def get_type(self):
        operator_transfer_policy = sp.TVariant(
            no_transfer = sp.TUnit,
            owner_transfer = sp.TUnit,
            owner_or_operator_transfer = sp.TUnit)
        if self.config.force_layouts:
            operator_transfer_policy = operator_transfer_policy.layout(
                                       ("no_transfer",
                                        ("owner_transfer",
                                         "owner_or_operator_transfer")))
        owner_transfer_policy =  sp.TVariant(
            owner_no_op = sp.TUnit,
            optional_owner_hook = sp.TUnit,
            required_owner_hook = sp.TUnit)
        if self.config.force_layouts:
            owner_transfer_policy = owner_transfer_policy.layout(
                                       ("owner_no_op",
                                        ("optional_owner_hook",
                                         "required_owner_hook")))
        custom_permission_policy = sp.TRecord(
            tag = sp.TString,
            config_api = sp.TOption(sp.TAddress))
        main = sp.TRecord(
            operator = operator_transfer_policy,
            receiver = owner_transfer_policy,
            sender   = owner_transfer_policy,
            custom   = sp.TOption(custom_permission_policy))
        if self.config.force_layouts:
            main = main.layout(("operator",
                                ("receiver",
                                 ("sender", "custom"))))
        return main
    def set_type_and_layout(self, expr):
        sp.set_type(expr, self.get_type())
    def make(self):
        def uv(s):
            return sp.variant(s, sp.unit)
        operator = ("owner_or_operator_transfer"
                    if self.config.support_operator
                    else "owner_transfer")
        v = sp.record(
            operator = uv(operator),
            receiver = uv("owner_no_op"),
            sender = uv("owner_no_op"),
            custom = sp.none
            )
        v = sp.set_type_expr(v, self.get_type())
        return v

## The set of all tokens is represented by a `nat` if we assume that token-ids
## are consecutive, or by an actual `(set nat)` if not.
##
## - Knowing the set of tokens is useful for throwing accurate error messages.
## - Previous versions of the specification required this set for functional
##   behavior (operators worked per-token).
class Token_id_set:
    def __init__(self, config):
        self.config = config
    def empty(self):
        if self.config.assume_consecutive_token_ids:
            # The "set" is its cardinal.
            return sp.nat(0)
        else:
            return sp.set(t = token_id_type)
    def add(self, metaset, v):
        if self.config.assume_consecutive_token_ids:
            metaset.set(sp.max(metaset, v + 1))
        else:
            metaset.add(v)
    def contains(self, metaset, v):
        if self.config.assume_consecutive_token_ids:
            return (v < metaset)
        else:
            metaset.contains(v)

##
## ## Implementation of the Contract
##
## `mutez_transfer` is an optional entry-point, hence we define it “outside” the
## class:
def mutez_transfer(contract, params):
    sp.verify(sp.sender == contract.data.administrator)
    sp.set_type(params.destination, sp.TAddress)
    sp.set_type(params.amount, sp.TMutez)
    sp.send(params.destination, params.amount)
##
## The `FA2` class build a contract according to an `FA2_config` and an
## administrator address.
##
## - We see the use of
##   [`sp.entry_point`](https://www.smartpy.io/dev/reference.html#_entry_points)
##   as a function instead of using annotations in order to allow
##   optional entry points.
## - The storage field `metadata_string` is a placeholder, the build
##   system replaces the field annotation with a specific version-string, such
##   as `"version_20200602_tzip_b916f32"`: the version of FA2-smartpy and
##   the git commit in the TZIP [repository](https://gitlab.com/tzip/tzip) that
##   the contract should obey.

class FA2(sp.Contract):
    def __init__(self, config, admin):
        self.config = config
        self.operator_set           = Operator_set(self.config)
        self.operator_param         = Operator_param(self.config)
        self.token_id_set           = Token_id_set(self.config)
        self.ledger_key             = Ledger_key(self.config)
        self.token_meta_data        = Token_meta_data(self.config)
        self.permissions_descriptor_ = Permissions_descriptor(self.config)
        self.batch_transfer    = Batch_transfer(self.config)
        if  self.config.add_mutez_transfer:
            self.transfer_mutez = sp.entry_point(mutez_transfer)
        if  self.config.add_permissions_descriptor:
            def permissions_descriptor(self, params):
                sp.set_type(params, sp.TContract(self.permissions_descriptor_.get_type()))
                v = self.permissions_descriptor_.make()
                sp.transfer(v, sp.mutez(0), params)
            self.permissions_descriptor = sp.entry_point(permissions_descriptor)
        self.init(
            highestTokenIndex = 0,
            paused = False,
            ledger =
                self.config.my_map(tvalue = Ledger_value.get_type()),
            tokens =
                self.config.my_map(tvalue = sp.TRecord(
                    total_supply = sp.TNat,
                    metadata = self.token_meta_data.get_type()
                )),
            operators = self.operator_set.make(),
            administrator = admin,
            all_tokens = self.token_id_set.empty(),
            metadata_string = sp.unit
        )

    @sp.entry_point
    def set_pause(self, params):
        sp.verify(sp.sender == self.data.administrator)
        self.data.paused = params

    @sp.entry_point
    def set_administrator(self, params):
        sp.verify(sp.sender == self.data.administrator)
        self.data.administrator = params

    @sp.entry_point
    def mint(self, params):
        sp.verify(sp.sender == self.data.administrator)
        # We don't check for pauseness because we're the admin.
        if self.config.single_asset:
            sp.verify(params.token_id == 0, "single-asset: token-id <> 0")
        if self.config.non_fungible:
            sp.verify(params.amount == 1, "NFT-asset: amount <> 1")
            sp.verify(~ self.token_id_set.contains(self.data.all_tokens,
                                                   params.token_id),
                      "NFT-asset: cannot mint twice same token")
        user = self.ledger_key.make(params.address, params.token_id)
        self.token_id_set.add(self.data.all_tokens, params.token_id)
        sp.if self.data.ledger.contains(user):
            self.data.ledger[user].balance += params.amount
        sp.else:
            self.data.ledger[user] = Ledger_value.make(params.amount)
        sp.if self.data.tokens.contains(params.token_id):
             self.data.tokens[params.token_id].total_supply += params.amount
        sp.else:
             self.data.tokens[params.token_id] = sp.record(
                 total_supply = params.amount,
                 metadata = sp.record(
                     token_id = params.token_id,
                     symbol = params.symbol,
                     name = "", # Consered useless here
                     decimals = 0,
                     extras = sp.map()
                 )
             )
        self.data.highestTokenIndex += 1

    @sp.entry_point
    def transfer(self, params):
        sp.verify( ~self.data.paused )
        sp.set_type(params, self.batch_transfer.get_type())
        sp.for transfer in params:
           current_from = transfer.from_
           if self.config.support_operator:
               sp.verify(
                   (sp.sender == self.data.administrator) |
                   (current_from == sp.sender) |
                   self.operator_set.is_member(self.data.operators,
                                               current_from,
                                               sp.sender),
                   message = Error_message.not_operator())
           else:
               sp.verify(
                   (sp.sender == self.data.administrator) |
                   (current_from == sp.sender),
                   message = Error_message.not_owner())
           sp.for tx in transfer.txs:
                sp.verify(tx.amount > 0, message = "TRANSFER_OF_ZERO")
                if self.config.single_asset:
                    sp.verify(tx.token_id == 0, "single-asset: token-id <> 0")
                from_user = self.ledger_key.make(current_from, tx.token_id)
                sp.verify(
                    (self.data.ledger[from_user].balance >= tx.amount),
                    message = Error_message.insufficient_balance())
                to_user = self.ledger_key.make(tx.to_, tx.token_id)
                self.data.ledger[from_user].balance = sp.as_nat(
                    self.data.ledger[from_user].balance - tx.amount)
                sp.if self.data.ledger.contains(to_user):
                    self.data.ledger[to_user].balance += tx.amount
                sp.else:
                     self.data.ledger[to_user] = Ledger_value.make(tx.amount)

    @sp.entry_point
    def balance_of(self, params):
        # paused may mean that balances are meaningless:
        sp.verify( ~self.data.paused )
        res = sp.local("responses", [])
        sp.set_type(res.value, Balance_of.response_type())
        sp.for req in params.requests:
            user = self.ledger_key.make(req.owner, req.token_id)
            balance = self.data.ledger[user].balance
            res.value.push(
                sp.record(
                    request = sp.record(
                        owner = sp.set_type_expr(req.owner, sp.TAddress),
                        token_id = sp.set_type_expr(req.token_id, sp.TNat)),
                    balance = balance))
        destination = sp.set_type_expr(params.callback,
                                       sp.TContract(Balance_of.response_type()))
        sp.transfer(res.value.rev(), sp.mutez(0), destination)

    @sp.entry_point
    def total_supply(self, params):
        sp.verify( ~self.data.paused )
        res = sp.local("responses", [])
        sp.set_type(res.value, Total_supply.response_type())
        sp.for req in params.token_ids:
            res.value.push(
                sp.record(
                    token_id = req,
                    total_supply = self.data.tokens[req].total_supply))
        destination = sp.set_type_expr(params.callback,
                                       sp.TContract(Total_supply.response_type()))
        sp.transfer(res.value.rev(), sp.mutez(0), destination)

    @sp.entry_point
    def token_metadata(self, params):
        sp.verify( ~self.data.paused )
        res = sp.local("responses", [])
        sp.for req in params.token_ids:
            self.token_meta_data.set_type_and_layout(self.data.tokens[req].metadata)
            res.value.push(self.data.tokens[req].metadata)
        destination = sp.set_type_expr(params.callback,
                                       sp.TContract(
                                           sp.TList(self.token_meta_data.get_type())))
        sp.transfer(res.value.rev(), sp.mutez(0), destination)

    @sp.entry_point
    def update_operators(self, params):
        sp.set_type(params, sp.TList(
            sp.TVariant(
                add_operator = self.operator_param.get_type(),
                remove_operator = self.operator_param.get_type())))
        if self.config.support_operator:
            sp.for update in params:
                sp.if update.is_variant("add_operator"):
                    upd = update.open_variant("add_operator")
                    sp.verify((upd.owner == sp.sender) |
                              (sp.sender == self.data.administrator))
                    self.operator_set.add(self.data.operators,
                                          upd.owner,
                                          upd.operator)
                sp.else:
                    upd = update.open_variant("remove_operator")
                    sp.verify((upd.owner == sp.sender) |
                              (sp.sender == self.data.administrator))
                    self.operator_set.remove(self.data.operators,
                                             upd.owner,
                                             upd.operator)
        else:
            sp.failwith("not implemented")


    @sp.entry_point
    def is_operator(self, params):
        sp.set_type(params, self.operator_param.is_operator_request_type())
        if self.config.support_operator:
            res = self.operator_set.is_member(self.data.operators,
                                              params.operator.owner,
                                              params.operator.operator)
            returned = sp.record(
                operator = params.operator,
                is_operator = res)
            sp.transfer(returned, sp.mutez(0), params.callback)
        else:
            returned = sp.record(
                operator = params.operator,
                is_operator = False)
            sp.transfer(returned, sp.mutez(0), params.callback)




    @sp.entry_point
    def create_certificate(self, params):

        # 0) verify that lock period is not more than 2 years
        sp.verify(params.months < 25)

        # 1) get tez value
        mintAmount = sp.split_tokens(sp.amount, 100, 100)
        coins = sp.ediv(mintAmount, sp.mutez(1) )
        principal = sp.to_int( sp.fst(coins.open_some()) )


        # 2) get timestamp
        end_time = sp.now.add_days(params.months*30)


        # 3) calculate payout
        w = sp.local('w', 1)
        y = sp.local('y', 0)
        sp.while y.value < params.months:

            w.value = 10033*w.value
            y.value = y.value + 1

        scaled_up_intrest = w.value

        u = sp.local('u', 1)
        v = sp.local('v', 0)
        sp.while v.value < params.months:

            u.value = 10000*u.value
            v.value = v.value + 1

        scale_factor = u.value

        scaled_stake = principal*(scaled_up_intrest - scale_factor)

        x = sp.as_nat(scaled_stake)/sp.as_nat(scale_factor)
        stake = sp.to_int(x)


        # 3) get highest token_index
        token_id = self.data.highestTokenIndex


        # 4) mint certificate
        sp.verify(~ self.token_id_set.contains(self.data.all_tokens,
                                               token_id),
                  "NFT-asset: cannot mint twice same token")

        user = self.ledger_key.make(sp.sender, token_id)
        self.token_id_set.add(self.data.all_tokens, token_id)

        sp.if self.data.ledger.contains(user):
            self.data.ledger[user].balance += 1
        sp.else:
            self.data.ledger[user] = Ledger_value.make(1)
        sp.if self.data.tokens.contains(token_id):
             self.data.tokens[token_id].total_supply += 1
        sp.else:
             self.data.tokens[token_id] = sp.record(
                 total_supply = 1,
                 metadata = sp.record(
                     token_id = token_id,
                     symbol = "IOU",
                     name = "", # Consered useless here
                     decimals = 0,
                     extras = sp.map({"value":principal, "earlyUnlockFee":stake, "unlockTime":( end_time - sp.timestamp(0) ) } )

                 )
             )
        self.data.highestTokenIndex += 1


    @sp.entry_point
    def redeem_certificate(self, params):

        # 0)  use params.token_id to look up certificate
        certificate = self.data.tokens[params.token_id]


        # 1)  verify you are owner of certificate
        user = self.ledger_key.make(sp.sender, params.token_id)
        sp.verify( self.data.ledger.contains(user) )


        # 2)  Determine payout based on time

        unlockTime = certificate.metadata.extras["unlockTime"]
        payout = certificate.metadata.extras["value"]
        early_unlock_fee = certificate.metadata.extras["earlyUnlockFee"]

        x = sp.now.add_seconds(- unlockTime )

        sp.if (x - sp.timestamp(0) )  < 0:
            payout = payout - early_unlock_fee



        # 3) Burn Certificate
        user = self.ledger_key.make(sp.sender, params.token_id)
        self.data.ledger[user].balance = 0
        self.data.tokens[params.token_id].total_supply = 0


        # 4) Payout
        sp.send( sp.sender, sp.mutez( sp.as_nat(payout) ))



## ### Generation of Test Scenarios
##
## Tests are also parametrized by the `FA2_config` object.
## The best way to visualize them is to use the online IDE
## (<https://www.smartpy.io/dev/>).
def add_test(config, is_default = True):
    @sp.add_test(name = config.name, is_default = is_default)
    def test():
        scenario = sp.test_scenario()
        scenario.h1("FA2 Contract Name: " + config.name)
        scenario.table_of_contents()
        # sp.test_account generates ED25519 key-pairs deterministically:
        admin = sp.test_account("Administrator")
        alice = sp.test_account("Alice")
        bob   = sp.test_account("Robert")
        # Let's display the accounts:
        scenario.h2("Accounts")
        scenario.show([admin, alice, bob])
        c1 = FA2(config, admin.address)
        scenario += c1
        if config.non_fungible:
            # TODO
            return
        scenario.h2("Initial Minting")
        scenario.p("The administrator mints 100 token-0's to Alice.")
        scenario += c1.mint(address = alice.address,
                            amount = 100,
                            symbol = 'TK0',
                            token_id = 0).run(sender = admin)


        scenario.h2("Create certificate")
        scenario += c1.create_certificate(months = 5).run(sender = bob, amount=sp.mutez(100000000))

        scenario.h2("redeem  certificate")
        scenario += c1.redeem_certificate(token_id = 1).run(sender = bob)



##
## ## Global Environment Parameters
##
## The build system communicates with the python script through
## environment variables.
## The function `environment_config` creates an `FA2_config` given the
## presence and values of a few environment variables.
def global_parameter(env_var, default):
    try:
        if os.environ[env_var] == "true" :
            return True
        if os.environ[env_var] == "false" :
            return False
        return default
    except:
        return default

def environment_config():
    return FA2_config(
        debug_mode = global_parameter("debug_mode", False),
        single_asset = global_parameter("single_asset", False),
        non_fungible = global_parameter("non_fungible", False),
        add_mutez_transfer = global_parameter("add_mutez_transfer", False),
        readable = global_parameter("readable", True),
        force_layouts = global_parameter("force_layouts", True),
        support_operator = global_parameter("support_operator", True),
        assume_consecutive_token_ids = global_parameter("assume_consecutive_token_ids", True),
        add_permissions_descriptor = global_parameter("add_permissions_descriptor", True))

## ## Standard “main”
##
## This specific main uses the relative new feature of non-default tests
## for the browser version.
if "templates" not in __name__:
    add_test(environment_config())
    if not global_parameter("only_environment_test", False):
        add_test(FA2_config(debug_mode = True), is_default = not sp.inBrowser)
        add_test(FA2_config(single_asset = True), is_default = not sp.inBrowser)
        add_test(FA2_config(non_fungible = True, add_mutez_transfer = True),
                 is_default = not sp.inBrowser)
        add_test(FA2_config(readable = False), is_default = not sp.inBrowser)
        add_test(FA2_config(force_layouts = False), is_default = not sp.inBrowser)
        add_test(FA2_config(debug_mode = True, support_operator = False),
                 is_default = not sp.inBrowser)
        add_test(FA2_config(assume_consecutive_token_ids = False)
                 , is_default = not sp.inBrowser)
        add_test(FA2_config(add_mutez_transfer = True)
                 , is_default = not sp.inBrowser)
