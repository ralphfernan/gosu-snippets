package demo

uses gw.api.databuilder.CheckBuilder
uses gw.api.databuilder.ClaimBuilder
uses gw.api.financials.CurrencyAmount
uses gw.api.test.CCServerTestClassBase
uses gw.api.test.CCUnitTestClassBase
uses gw.suites.CCExampleServerSuite
uses gw.testharness.v3.Suites
uses gw.transaction.Transaction

@Export
@Suites(CCExampleServerSuite.NAME)
class WhenTestTest extends CCServerTestClassBase {

  //private var _claim:Claim
  //private var _check:Check

  override function beforeClass() {
    super.beforeClass()
  }

  public function testClaimCreation() {
    // The test logic goes here

    var bundle = Transaction.getCurrent()
    assertNotNull(bundle)
    var logger = getLogger()
    assertNotNull(logger)
    assertFalse(bundle.isReadOnly()) // can add to it!

    final var _claim = new ClaimBuilder()
        .withClaimNumber("000-00-000001")
        .create(bundle)

    assertEquals("000-00-000001",_claim.getClaimNumber())

    var payAmt : CurrencyAmount = new CurrencyAmount(5500.00, Currency.get("usd"))

    var _payment = new Payment()
    _payment.getFirstLineItem().setAmountMatchingCurrency(payAmt)

    final var _check = new CheckBuilder()
        .withCheckNumber("100000444666")
        .withPayment(_payment)
        .create(bundle)

    assertEquals(_payment, _check.getPayments().first())
  }

  // Additional test methods go here
}
