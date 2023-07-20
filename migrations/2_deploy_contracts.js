//Contract To deploy
var HyperVerseToken = artifacts.require("../contracts/HyperVerse");

module.exports = function (deployer) {
    deployer.deploy(HyperVerseToken, "HyperVerse", "HYPO", "1000000000");
};
