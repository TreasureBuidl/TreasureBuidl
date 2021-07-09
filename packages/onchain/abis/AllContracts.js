const PlanetFactory = require("./PlanetFactory.json");
const TokenOwnership = require("./TokenOwnership.json");
const TreasureMaps = require("./TreasureMaps.json");

export const allContracts = {
  "4": {
    "rinkeby": {
      "name": "rinkeby",
      "chainId": "4",
      "contracts": {
        "PlanetFactory": {
          ...PlanetFactory,
          "address": "0xD35262a1B20F17ee9459b0Ca0B37bCB170631617"
        },
        "TokenOwnership": {
          ...TokenOwnership,
          "address": "0x1FfFE9f5bBA120bC15197b91a8DD97bC0c01EFAD"
        },
        "TreasureMaps": {
          ...TreasureMaps,
          "address": "0xe46Fa1Ab56370581E110E0d00bd49B9E01E55a70"
        },
      }
    }
  },
  "42": {
    "kovan": {
      "name": "kovan",
      "chainId": "42",
      "contracts": {
        "PlanetFactory": {
          ...PlanetFactory,
          "address": "0x61800b92d203328faFdA869582629789420E64dA"
        },
        "TokenOwnership": {
          ...TokenOwnership,
          "address": "0xeE7A9C2BC51CA1A0dfbA7a1EDD9FCDB9EB78F828"
        },
        "TreasureMaps": {
          ...TreasureMaps,
          "address": "0xF02b24eeA846D393cBC6C774A6F749B11669d46d"
        },
      }
    }
  }
}
