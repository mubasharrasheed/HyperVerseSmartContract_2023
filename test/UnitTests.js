//Contract To test
const Contract = "HyperVerse";
//Particulars for contract
const Name = "HyperVerse";
const Symbol = "HYPO";
const Decimal = 18;
const TotalSupply = 1000000000 * 10 ** 18;
let tokensToTest = 1000;

//Contract Artifact
const TOKEN = artifacts.require(Contract);

//Big Number library to work with Big Numbers
const BigNumber = require("bignumber.js");

//Chai imports to test Big Numbers
var chai = require("chai");
chai.use(require("chai-bignumber")());
var expect = require("chai").expect;

contract(Contract, (accounts) => {
    it("should test particulars", () =>
        TOKEN.deployed().then(async (token) => {
            let name = await token.name();
            assert.equal(name, Name, "Name isn't correct");
            let symbol = await token.symbol();
            assert.equal(symbol, Symbol, "Symbol isn't correct");
            let decimal = await token.decimals();
            assert.equal(decimal, Decimal, "Decimal isn't correct");
        }));

    it("should test total supply", () =>
        TOKEN.deployed().then(async (token) => {
            let contractSupply = new BigNumber(await token.totalSupply());
            let expectedSupply = new BigNumber(TotalSupply);
            expect(contractSupply).to.be.bignumber.equal(expectedSupply);
        }));

    it("should test transfer", () =>
        TOKEN.deployed().then(async (token) => {
            await token.transfer(accounts[1], tokensToTest, {
                from: accounts[0],
            });
            assert.equal(
                await token.balanceOf(accounts[1]),
                tokensToTest,
                "Transfer not Successful"
            );
        }));

    it("should test approve, increase and decrease allowance", () =>
        TOKEN.deployed().then(async (token) => {
            await token.approve(accounts[1], tokensToTest, {
                from: accounts[0],
            });
            assert.equal(
                await token.allowance(accounts[0], accounts[1]),
                tokensToTest,
                "Approved not Successful"
            );
            await token.increaseAllowance(accounts[1], tokensToTest, {
                from: accounts[0],
            });
            assert.equal(
                await token.allowance(accounts[0], accounts[1]),
                tokensToTest + tokensToTest,
                "Increase Allowance not Successful"
            );
            await token.decreaseAllowance(accounts[1], tokensToTest, {
                from: accounts[0],
            });
            assert.equal(
                await token.allowance(accounts[0], accounts[1]),
                tokensToTest,
                "Decrease Allowance not Successful"
            );
        }));

    it("should test transfer from", () =>
        TOKEN.deployed().then(async (token) => {
            await token.transferFrom(accounts[0], accounts[2], tokensToTest, {
                from: accounts[1],
            });
            assert.equal(
                await token.balanceOf(accounts[2]),
                tokensToTest,
                "Transfer from not Successful"
            );
        }));
    it("should test burn", () =>
        TOKEN.deployed().then(async (token) => {
            await token.burn(tokensToTest, { from: accounts[0] });
            let newSupply = new BigNumber(await token.totalSupply());
            let expectedSupply = new BigNumber(TotalSupply).minus(tokensToTest);
            expect(newSupply).to.be.bignumber.equal(expectedSupply);
        }));

    it("should test burn from", () =>
        TOKEN.deployed().then(async (token) => {
            await token.approve(accounts[1], tokensToTest, {
                from: accounts[0],
            });
            await token.burnFrom(accounts[0], tokensToTest, {
                from: accounts[1],
            });
            let newSupply = new BigNumber(await token.totalSupply());
            let expectedSupply = new BigNumber(TotalSupply).minus(
                tokensToTest * 2
            );
            expect(newSupply).to.be.bignumber.equal(expectedSupply);
        }));

    it("should test pause", () =>
        TOKEN.deployed().then(async (token) => {
            await token.pause();
            assert.equal(await token.paused(), true, "Pause not Successful");
        }));

    it("should test unpause", () =>
        TOKEN.deployed().then(async (token) => {
            await token.unpause();
            assert.equal(await token.paused(), false, "Unpause not Successful");
        }));
});
