const PlanetFactory = require("./PlanetFactory.json");
const TokenOwnership = require("./TokenOwnership.json");
const TreasureMaps = require("./TreasureMaps.json");
//const TreasurePlanet = require("./TreasurePlanet.json");

export const allContracts = {
  "4": {
    "rinkeby": {
      "name": "rinkeby",
      "chainId": "4",
      "contracts": {
        "PlanetFactory": PlanetFactory,
        "TokenOwnership": TokenOwnership,
        "TreasureMaps": TreasureMaps,
        //"TreasurePlanet": TreasurePlanet
      }
    }
  }
}
