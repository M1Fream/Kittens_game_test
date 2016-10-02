/**
 * Behold the bringer of light!
 */
dojo.declare("classes.managers.SpaceManager", com.nuclearunicorn.core.TabManager, {

	/*
	 * Planets and celestial bodies from left to right:
	 *
	 * Charon, Umbra (black hole), Yarn (terraformable?), Helios (Sun), Cath, Redmoon (Cath satellite), Dune, Piscine, Terminus (ice giant), Kairo (dwarf planet)
	 *
	 */

	game: null,

	hideResearched: false,

	programs: [{
		name: "orbitalLaunch",
		label: "Orbital Launch",
		description: "Launch a rocket to a space.",
		unlocked: true,
		prices: [
			{name: "starchart", val: 250},
			{name: "manpower", val: 5000},
			{name: "science", val: 100000},
			{name: "oil", val: 15000}
		],
		noStackable: true,
        unlocks: {
            planet: ["cath"],
            spaceMission: ["moonMission"]
        }
	},{
		name: "moonMission",
		label: "Moon Mission",
		description: "Launch a rocket to Redmoon, a Cath planet satellite",
		unlocked: false,
		prices: [
			{name: "starchart", val: 500},
			{name: "titanium", 	val: 5000},
			{name: "science", 	val: 125000},
			{name: "oil", 		val: 45000}
		],
		noStackable: true,
        unlocks: {
            planet: ["moon"],
            spaceMission: ["duneMission", "piscineMission"]
        }
	},{
		name: "duneMission",
		label: "Dune Mission",
		description: "Dune is a large and lifeless planet covered by sand and volcanic rock.",
		unlocked: false,
		prices: [
			{name: "starchart", val: 1000},
			{name: "titanium", val: 7000},
			{name: "science", val: 175000},
			{name: "kerosene", val: 75}
		],
		noStackable: true,
		unlocks: {
            planet: ["dune"],
            spaceMission: ["heliosMission"]
        }
	},{
		name: "piscineMission",
		label: "Piscine Mission",
		description: "Piscine is a gigantic aquatic planet composed of an acid body and a methane atmosphere",
		unlocked: false,
		prices: [
			{name: "starchart", val: 1500},
			{name: "titanium", val: 9000},
			{name: "science", val: 200000},
			{name: "kerosene", val: 250}
		],
		noStackable: true,
        unlocks: {
            planet: ["piscine"],
            spaceMission: ["terminusMission"]
        }
	},{
		name: "heliosMission",
		label: "Helios Mission",
		description: "Helios is a G2V spectral type star in the center of the Cath solar system.",
		unlocked: false,
		prices: [
			{name: "starchart", val: 3000},
			{name: "titanium", val: 15000},
			{name: "science", val: 250000},
			{name: "kerosene", val: 1250}
		],
		noStackable: true,
        unlocks: {
            planet: ["helios"],
            spaceMission: ["yarnMission"]
        }
	},{
		name: "terminusMission",
		label: "T-minus Mission",
		description: "Terminus is a supermassive ice giant at the far end of a Helios solar system.",
		unlocked: false,
		prices: [
			{name: "starchart", val: 2500},
			{name: "titanium", val: 12000},
			{name: "science", val: 225000},
			{name: "kerosene", val: 750}
		],
		noStackable: true,
        unlocks: {
            planet: ["terminus"],
            spaceMission: ["heliosMission", "kairoMission"]
        }
	},{
		name: "kairoMission",
		label: "Kairo Mission",
		description: "Kairo is a dwarf planet in the far end of the Cath solar system.",
		unlocked: false,
		prices: [
			{name: "starchart", val: 5000},
			{name: "titanium", 	val: 20000},
			{name: "science", 	val: 300000},
			{name: "kerosene", 	val: 7500}
		],
		noStackable: true,
		unlocks: {
			planet: ["kairo"],
            spaceMission: ["rorschachMission"]
		}
	},{
		name: "rorschachMission",
		label: "???",
		description: "???",
		unlocked: false,
		prices: [
			{name: "starchart", val: 15000},
			{name: "titanium", 	val: 80000},
			{name: "science", 	val: 500000},
			{name: "kerosene", 	val: 25000}
		],
		noStackable: true,
		unlocks: {
			spaceMission: ["centaurusSystemMission"]
		}
	},{
		name: "yarnMission",
		label: "Yarn Mission",
		description: "Yarn is a class M planet with high moderate climate, seas and oxygen atmosphere.",
		unlocked: false,
		prices: [
			{name: "starchart", val: 7500},
			{name: "titanium", 	val: 35000},
			{name: "science", 	val: 350000},
			{name: "kerosene", 	val: 12000}
		],
		noStackable: true,
		unlocks: {
			planet: ["yarn"]
		}
	},{
		name: "centaurusSystemMission",
		label: "Centaurus System Mission",
		description: "Centaurus System is a warm faraway star system.",
		unlocked: false,
		prices: [
			{name: "starchart", val: 100000},
			{name: "titanium", 	val: 40000},
			{name: "science", 	val: 400000},
			{name: "kerosene", 	val: 30000},
			{name: "thorium",   val: 50000}
		],
		noStackable: true,
		unlocks: {
			planet: ["centaurusSystem"]
		}
	}],

	//============================================================================

	planets:
	[{
		name: "cath",
		label: "Cath",
		reached: false,
		routeDays: 0,
		unlocked: false,
		buildings: [{
			name: "spaceElevator",
			label: "Space Elevator",
			description: "Every Space Elevator reduces oil requirements for space missions by 5%. Improves all space structures production effectiveness by 1%",
			unlocked: false,
			defaultUnlocked: true,
			priceRatio: 1.15,
			prices: [
				{name: "titanium", val: 6000},
				{name: "science", val: 75000},
				{name: "unobtainium", val: 50}
			],
			requiredTech: ["orbitalEngineering", "nanotechnology"],
			effects: {
				"oilReductionRatio": 0,
				"spaceRatio": 0,
				"prodTransferBonus" : 0
			},
			calculateEffects: function(self, game){
				self.effects = {
					"oilReductionRatio": 0.05,
					"spaceRatio": 0.01,
					"prodTransferBonus" : 0.001
				};
			},
		},{
			name: "sattelite",
			label: "Satellite",
			description: "Deploy a satellite. Satellites improve your observatory effectiveness by 5% and produce starcharts",
			unlocked: false,
			defaultUnlocked: true,
			prices: [
				{name: "starchart", val: 325},
				{name: "titanium", val: 2500},
				{name: "science", val: 100000},
				{name: "oil", val: 15000}
			],
			priceRatio: 1.08,
			requiredTech: ["sattelites"],
			effects: {
				"observatoryRatio": 0,
				"starchartPerTickBaseSpace": 0,
				"energyConsumption": 0,
				"energyProduction": 0
			},
			calculateEffects: function(self, game){
				self.effects = {
					"observatoryRatio": 0.05,
					"starchartPerTickBaseSpace": 0.001,
					"energyConsumption": 0,
					"energyProduction": 0
				};

				if (game.workshop.get("solarSatellites").researched) {
					self.effects["energyProduction"] = 1;
					self.togglable = false;
				}
				else {
					self.effects["energyConsumption"] = 1;
				}
			}
		},{
			name: "spaceStation",
			label: "Space Station",
			description: "Deploy a space station. Each station generates science and provide a space for 2 astronauts",
			unlocked: false,
			defaultUnlocked: true,
			prices: [
				{name: "starchart", val: 425},
				{name: "alloy", 	val: 750},
				{name: "science", val: 150000},
				{name: "oil", val: 35000}
			],
			priceRatio: 1.12,
			requiredTech: ["orbitalEngineering"],
			handler: function(game){
				game.ironWill = false;			//sorry folks
			},
			effects: {
				"maxKittens": 0,
				"scienceRatio": 0,
				"energyConsumption": 0
			},
			calculateEffects: function(self, game){
				self.effects = {
					"maxKittens": 2,
					"scienceRatio": 0.5,
					"energyConsumption": 10
				};
			}
		}]
	},{
		name: "moon",
		label: "Moon",
		reached: false,
		routeDays: 3,
		unlocked: false,
		buildings: [{
			name: "moonOutpost",
			label: "Lunar Outpost",
			description: "Deploy a nuclear powered mining outpost on Redmoon",
			unlocked: false,
			defaultUnlocked: true,
			priceRatio: 1.12,
			prices: [
				{name: "starchart", val: 650},
				{name: "uranium",  val: 500},
				{name: "alloy",    val: 750},
				{name: "concrate", val: 150},
				{name: "science", val: 100000},
				{name: "oil", val: 55000}
			],
			handler: function(game, self){
				//game.workshop.get("unobtainiumAxe").unlocked = true;
				//game.workshop.get("unobtainiumSaw").unlocked = true;
			},
			effects: {
				"energyConsumption": 0,
				"uraniumPerTickCon": 0,
				"unobtainiumPerTickSpace": 0
			},
			calculateEffects: function(self, game){
				self.effects = {
					"energyConsumption": 5,
					"uraniumPerTickCon": 0,
					"unobtainiumPerTickSpace": 0
				};
			},
			lackResConvert: false,
			action: function(game, self){
				self.effects["uraniumPerTickCon"] = -0.35;
				self.effects["unobtainiumPerTickSpace"] = 0.007 * (1+ game.getEffect("lunarOutpostRatio"));
				var amt = game.resPool.getAmtDependsOnStock(
					[{res: "uranium", amt: -self.effects["uraniumPerTickCon"]}],
					self.on
				);
				self.effects["uraniumPerTickCon"]*=amt;
				self.effects["unobtainiumPerTickSpace"]*=amt;

				return amt;
			}
		},{
			name: "moonBase",
			label: "Moon base",
			description: "Establish a base on a surface of Redmoon",
			unlocked: false,
			defaultUnlocked: true,
			priceRatio: 1.12,
			prices: [
				{name: "starchart", 	val: 700},
				{name: "titanium", 		val: 9500},
				{name: "concrate", 		val: 250},
				{name: "science", 		val: 100000},
				{name: "unobtainium", 	val: 50},
				{name: "oil", 			val: 70000}
			],
			effects: {
				"catnipMax"         : 0,
				"woodMax"           : 0,
				"mineralsMax"       : 0,
				"ironMax"           : 0,
				"coalMax"           : 0,
				"titaniumMax"       : 0,
				"oilMax"            : 0,
				"unobtainiumMax"    : 0,
				"energyConsumption" : 0
			},
			calculateEffects: function(self, game){
				self.effects = {
					"catnipMax"         : 45000,
					"woodMax"           : 25000,
					"mineralsMax"       : 30000,
					"ironMax"           : 9000,
					"coalMax"           : 3500,
					"titaniumMax"       : 1250,
					"oilMax"            : 3500,
					"unobtainiumMax"    : 150,
					"energyConsumption" : game.workshop.get("amBases").researched ? 5 : 10
				};
			}
		}]
	},{
		name: "dune",
		label: "Dune",
		reached: false,
		routeDays: 356,
		unlocked: false,
        buildings: [{
            name: "planetCracker",
            label: "Planet Cracker",
            description: "USS Mining Vessel Hissmeowra that can crack an entire planet",
            unlocked: false,
            defaultUnlocked: true,
            priceRatio: 1.18,
            prices: [
                {name: "starchart", val: 2500},
                {name: "alloy",  val: 1750},
                {name: "science", val: 125000},
                {name: "kerosene", val: 50}
            ],
            effects: {
				"uraniumPerTickSpace" : 0,
				"uraniumMax" : 0
            },
			calculateEffects: function (self, game){
				self.effects = {
					"uraniumPerTickSpace" : 0.3
						* (1 + game.getEffect("crackerRatio")),
					"uraniumMax" : 1750
				};
			}
        },{
            name: "hydrofracturer",
            label: "Hydraulic Fracturer",
            description: "Produces a high-pressure stream of oil. Every Space Elevator will boost this production by 0.1% of the global production multiplier.",
            unlocked: false,
            defaultUnlocked: true,
            priceRatio: 1.18,
            prices: [
                {name: "starchart", val: 750},
                {name: "alloy",  val: 1025},
                {name: "science", val: 150000},
                {name: "kerosene", val: 100}
            ],
            effects: {
				"oilPerTickAutoprodSpace": 0
            },
			calculateEffects: function(self, game){
				self.effects = {
					"oilPerTickAutoprodSpace": 0.5
				};
			}
        }]
	},{
		name: "piscine",
		label: "Piscine",
		reached: false,
		routeDays: 256,
		unlocked: false,
		buildings: [{
            name: "researchVessel",
            label: "Research Vessel",
            description: "Mobile research space vessel.",
            unlocked: false,
            defaultUnlocked: true,
            priceRatio: 1.15,
            prices: [
                {name: "starchart", val: 500},
                {name: "alloy",  val: 2500},
                {name: "titanium", val: 12500},
                {name: "kerosene", val: 250}
            ],
            effects: {
				"starchartPerTickBaseSpace": 0,
				"scienceMax": 0
			},
            calculateEffects: function(self, game){
				self.effects = {
					"starchartPerTickBaseSpace": 0.01,
					"scienceMax": 10000 * (1 + game.getEffect("spaceScienceRatio"))
				};
            }
        },{
            name: "orbitalArray",
            label: "Orbital Array",
            description: "Provide a 2% production bonus to all space structures",
            unlocked: false,
            defaultUnlocked: true,
            priceRatio: 1.15,
            prices: [
                {name: "eludium",  val: 100},
                {name: "science", val: 250000},
                {name: "kerosene", val: 500}
            ],
            effects: {
				"spaceRatio": 0,
				"energyConsumption" : 0
				},
            calculateEffects: function(self, game){
				self.effects = {
					"spaceRatio": 0.02,
					"energyConsumption" : 20
				};
            }
        }]
	},{
		name: "helios",		//technically it is a planet from the game point of view
		label: "Helios",
		reached: false,
		routeDays: 227,
		unlocked: false,
		buildings: [{
            name: "sunlifter",
            label: "Sunlifter",
            description: "Generates antimatter once per year. Inactive if energy production is negative",
            unlocked: false,
            defaultUnlocked: true,
            priceRatio: 1.15,
            prices: [
                {name: "science", val: 500000},
                {name: "eludium", val: 250},
                {name: "kerosene", val: 2500}
            ],
            effects: {
				"antimatterProduction": 0,
				"energyProduction" : 0
			},
            calculateEffects: function(self, game){
				self.effects = {
					"antimatterProduction": 1,
					"energyProduction" : 30
				};
            }
        },{
			name: "containmentChamber",
			label: "Cont. Chamber",
			description: "Containment Chamber. Increases antimatter storage space by 100.",
			unlocked: false,
			defaultUnlocked: true,
			priceRatio: 1.15,
			prices: [
				{name: "science", val: 500000},
				{name: "kerosene", val: 2500}
			],
			effects: {
				"energyConsumption": 0,
				"antimatterMax": 0
			},
			calculateEffects: function(self, game){
				self.effects = {
					"energyConsumption" : 50,
					"antimatterMax": 100
				};
			}
		}]
	},{
		name: "terminus",
		label: "T-Minus",
		reached: false,
		routeDays: 457,
		unlocked: false,
        buildings:[{
            name: "cryostation",
            label: "Cryostation",
            description: "A vast storage facility complex",
            unlocked: false,
            defaultUnlocked: true,
            priceRatio: 1.12,
            prices: [
                {name: "eludium", val: 25       },
                {name: "concrate", val: 1500    },
                {name: "science", val: 200000   },
                {name: "kerosene", val: 500   }
            ],
            effects: {
				"woodMax"       : 0,
				"mineralsMax"   : 0,
				"ironMax"       : 0,
				"coalMax"       : 0,
				"uraniumMax"    : 0,
				"titaniumMax"   : 0,
				"oilMax"        : 0,
				"unobtainiumMax": 0
			},
            calculateEffects: function(self, game){
				self.effects = {
					"woodMax"       : 200000,
					"mineralsMax"   : 200000,
					"ironMax"       : 50000,
					"coalMax"       : 25000,
					"uraniumMax"    : 5000,
					"titaniumMax"   : 7500,
					"oilMax"        : 25000,
					"unobtainiumMax": 750
				};
            }
        }
        ]
	},{
		name: "kairo",
		label: "Kairo",
		reached: false,
		routeDays: 492,
		unlocked: false,
		buildings:[
			{
				name: "spaceBeacon",
				label: "Space Beacon",
				description: "An AM-powered space station used for research and interstellar navigation.",
				unlocked: false,
				defaultUnlocked: true,
				priceRatio: 1.15,
				prices: [
					{name: "starchart", 	val: 25000 },
					{name: "antimatter", 	val: 50 },
					{name: "alloy", 		val: 25000 },
					{name: "kerosene", 		val: 7500   }
				],
				effects: {
					"starchartPerTickBaseSpace": 0,
					"scienceMax": 0,
					"relicPerDay": 0
				},
				calculateEffects: function(self, game){
					self.effects = {
						"starchartPerTickBaseSpace": 0.025,
						"scienceMax": 25000 * (1 + game.getEffect("spaceScienceRatio")),
						"relicPerDay": game.getEffect("beaconRelicsPerDay")
					};
				}
			}
		]
	},{
		name: "yarn",
		label: "Yarn",
		reached: false,
		routeDays: 603,
		unlocked: false,
		buildings:[
			{
				name: "terraformingStation",
				label: "Terraforming Station",
				description: "Explode a charge of antimatter to melt yarn ice and throw an oxygen into the atmosphere",
				unlocked: false,
				defaultUnlocked: function(game) {
					return game.science.get("terraformation").researched;
				},
				priceRatio: 1.25,
				prices: [
					{name: "antimatter", val: 25  },
					{name: "uranium", val: 5000  },
					{name: "kerosene", val: 5000  }
				],
				effects: {
					"maxKittens": 0
				},
				calculateEffects: function(self, game){
					self.effects = {
						"maxKittens": 1
					};
				}
			},
			{
				name: "hydroponics",
				label: "Hydroponics",
				description: "State of the art automated hydroponic system. Increase catnip limit by 10%. Increase catnip production by 2.5%",
				unlocked: false,
				defaultUnlocked: function(game) {
					return game.science.get("terraformation").researched;
				},
				priceRatio: 1.15,
				prices: [
					{name: "kerosene", val: 500 }
				],
				effects: {
					"catnipMaxRatio" : 0,
					"catnipRatio" : 0
				},
				calculateEffects: function(self, game){
					self.effects = {
						"catnipMaxRatio" : 0.1,
						"catnipRatio" : 0.025
					};
				}
			}
		]
	},{
		name: "centaurusSystem",
		label: "Centaurus System",
		reached: false,
		routeDays: 120000,
		unlocked: false,
		buildings:[
			{
				name: "tectonic",
				label: "Tectonic",
				description: "Rip open the planet near the star Centaurus to collect magma energy.",
				unlocked: false,
				defaultUnlocked: true,
				priceRatio: 1.25,
				prices: [
					{name: "science", val: 600000 },
					{name: "antimatter", val: 500 },
					{name: "thorium", val: 75000 }
				],
				effects: {
					"energyProduction": 0
				},
				calculateEffects: function(self, game){
					self.effects = {
						"energyProduction": 25
					};
				}
			}
		]
	}],

	metaCache: null,

	//============================================================================

	constructor: function(game){
		this.game = game;
		this.metaCache = {};
		this.registerMetaSpace();
		this.setEffectsCachedExisting();
	},

	registerMetaSpace: function(){
		var game = this.game;
		this.registerMeta(this.programs, { getEffect: function(program, effectName){
			if (!program.effects){
				return 0;
			}
			var val = program.togglable ? program.on: program.val;
			return program.noStackable ?
				program.effects[effectName]:
				program.effects[effectName] * val;
		}});

		for (var i in this.planets) {
			var planet = this.planets[i];
			this.registerMeta(planet.buildings, { getEffect: function(building, effectName){
				if (!building.effects){
					return 0;
				}
				var val = building.togglable ? building.on: building.val;

				if (effectName == "spaceRatio" && game.resPool.energyCons > game.resPool.energyProd){
					return building.effects[effectName] * val * game.resPool.getEnergyDelta();
				}

				return building.effects[effectName] * val;
			}});
		}

	},

	resetState: function(){
		for (var i = 0; i < this.programs.length; i++){
			var program = this.programs[i];

			program.unlocked = (program.name == "orbitalLaunch") ? true : false;

			this.resetStateStackable(program, program.isAutomationEnabled, program.lackResConvert, program.effects);
		}

		for (i = 0; i < this.planets.length; i++){
			var planet = this.planets[i];
			planet.unlocked = false;

			if (planet.buildings){
				for (var j = 0; j < planet.buildings.length; j++){
					var program = planet.buildings[j];

					this.resetStateStackable(program, program.isAutomationEnabled, program.lackResConvert, program.effects);
				}
			}
		}

		this.hideResearched = false;
	},

	save: function(saveData){

		var planets = this.filterMetadata(this.planets, ["name", "buildings", "reached", "unlocked", "routeDays"]);

		for (var i = 0; i < planets.length; i++){
			var planet = planets[i];
			if (planet.buildings){
				planet.buildings = this.filterMetadata(planet.buildings, ["name", "val", "on", "unlocked"]);
			}
		}

		saveData.space = {
			programs: this.filterMetadata(this.programs, ["name", "val", "on", "unlocked"]),
			planets: planets,
			hideResearched: this.hideResearched
		};
	},

	load: function(saveData){
		if (!saveData.space){
			return;
		}

		var self = this;

		this.hideResearched = saveData.space.hideResearched || false;

		if (saveData.space.programs){
			this.loadMetadata(this.programs, saveData.space.programs, ["val", "on", "unlocked"], function(loadedElem){
				//TODO: move to common method (like 'adjust prices'), share with religion code
				var prices = dojo.clone(loadedElem.prices);
				for (var k = prices.length - 1; k >= 0; k--) {
					var price = prices[k];
					for (var j = 0; j < loadedElem.val; j++){
						price.val = price.val * loadedElem.priceRatio;
					}
				}
			});
		}
		// programs and shit
		for (var i = this.programs.length - 1; i >= 0; i--) {
			var program = this.programs[i];
			if (program.on){
				if (program.handler) {
					program.handler(this.game, program);
				}

				if (program.unlocks){
					//TODO: move to some common method?
					if (program.unlocks.planet){
						this.game.space.getPlanet(program.unlocks.planet).unlocked = true;
					}
					if (program.unlocks.programs){
						dojo.forEach(program.unlocks.programs, function(uprogram, i){
							self.game.space.getProgram(uprogram).unlocked = true;
						});
					}
				}
			}
		}
		//planets
		if (saveData.space.planets){
			for (var i in saveData.space.planets){
				this.loadMetadata(this.planets, saveData.space.planets, ["reached", "unlocked", "routeDays"], function(loadedElem){
				});
				var savePlanet = saveData.space.planets[i];
				var planet = this.getMeta(savePlanet.name, this.planets);

				if (planet && planet.buildings && savePlanet.buildings){
					this.loadMetadata(planet.buildings, savePlanet.buildings, ["val", "on", "unlocked"], function(loadedElem){
					});
				}
			}
		}

	},

	update: function(){
		for (var i in this.planets){
			var planet = this.planets[i];

			if (!planet.reached && planet.unlocked) {
				if (planet.routeDays > 0) {
					var routeSpeed = this.game.getEffect("routeSpeed") != 0 ? this.game.getEffect("routeSpeed") : 1;
					planet.routeDays -= this.game.calendar.dayPerTick * routeSpeed;
				} else {
					planet.routeDays = 0;
					planet.reached = true;
					this.game.msg("You reach a new planet");
					for (var j in planet.buildings){
						planet.buildings[j].unlocked = planet.buildings[j].defaultUnlocked;
					}
				}
			}

			for (var j in planet.buildings){
				var bld = planet.buildings[j];

				if (bld.action && bld.val > 0){
					bld.action(this.game, bld);
					this.game.calendar.cycleEffectsBasics(bld.effects, bld.name);
				}
			}
		}
	},

	getProgram: function(name){
		if (this.metaCache[name]){
			return this.metaCache[name];
		}

		for (var i = this.programs.length - 1; i >= 0; i--){
			var program = this.programs[i];
			if (program.name == name){
				this.metaCache[name] = program;
				return program;
			}
		}

		for (i = this.planets.length - 1; i >= 0; i--){
			var planet = this.planets[i];
			if (planet.buildings){
				for (var j = planet.buildings.length - 1; j >= 0; j--){
					var bld = planet.buildings[j];
					if (bld.name == name){
						this.metaCache[name] = bld;
						return bld;
					}
				}
			}
		}
	},

	getPlanet: function(name){
		return this.getMeta(name, this.planets);
	},

	/**
	 * This method is probably slow as hell, revisit it
	 */
	getAutoProductionRatio: function(useTransferBonus){
        var ratio = ( 1 + this.game.getEffect("spaceRatio"));
		if (useTransferBonus){
			ratio *= ( 1 + ((this.game.bld.getAutoProductionRatio(false, 0.05) - 1) * (this.game.getEffect("prodTransferBonus"))));
		}

		if (this.game.workshop.get("spaceManufacturing").researched){
			var factory = this.game.bld.get("factory");
			ratio *= (1 + factory.on * factory.effects["craftRatio"] * 0.75);
		}
		return ratio;
	}
});

dojo.declare("com.nuclearunicorn.game.ui.SpaceProgramBtn", com.nuclearunicorn.game.ui.BuildingStackableBtn, {
	metaCached: null, // Call getMetadata
	program: null,
	simplePrices: false,

	getMetadata: function(){
		if (!this.metaCached){
			this.metaCached = this.game.space.getProgram(this.id);
		}
		return this.metaCached;
	},

	hasSellLink: function(){
		return false;
	},

    getPrices: function() {
        var program = this.getMetadata();
        var ratio = program.priceRatio || 1.15;

        var prices = dojo.clone(program.prices);
        if (!program.noStackable){
            for (var i = 0; i< prices.length; i++){
                if (prices[i].name !== "oil") {
                    prices[i].val = prices[i].val * Math.pow(ratio, program.val);
                 } else {
                    prices[i].val = prices[i].val * Math.pow(1.05, program.val);
                 }
            }
        }
        for (var i = 0; i < prices.length; i++){
            if (prices[i].name == "oil"){
                var reductionRatio = this.game.getHyperbolicEffect(this.game.getEffect("oilReductionRatio"), 0.75);
                prices[i].val *= (1 - reductionRatio);
            }
        }

        return prices;
    },

	updateVisible: function(){
		var program = this.getMetadata();
		if (program.requiredTech){
			for (var i = program.requiredTech.length - 1; i >= 0; i--) {
				var tech = this.game.science.get(program.requiredTech[i]);
				if (!tech.researched){
					this.setVisible(false);
					return;
				}
			}
		}
		if (program.on && program.noStackable && this.game.space.hideResearched){
			this.setVisible(false);
			return;
		}
		this.setVisible(program.unlocked);
	},

    build: function(bld, maxBld){
		var counter = 0;
		while (this.hasResources() && maxBld > 0){
			this.payPrice();

	        bld.val++;
			bld.on++;

            // manage togglableOnOff when Off
            if (bld.togglableOnOff && bld.on == 1){
                bld.on--;
            }

            counter++;
            maxBld--;
        }

		if (bld.breakIronWill) {
			this.game.ironWill = false;
		}

        if (counter > 1) {
			this.game.msg(bld.label + " x" + counter + " constructed.", "notice");
		}

		if (bld.unlocks){
			this.game.unlock(bld.unlocks);
		}

		if (bld.upgrades){
			this.game.upgrade(bld.upgrades);
		}

    },

});

dojo.declare("classes.ui.space.PlanetBuildingBtn", com.nuclearunicorn.game.ui.SpaceProgramBtn, {
	metaCached: null, // Call getMetadata
	planet: null,

	setOpts: function(opts){
		this.inherited(arguments);
		this.planet = opts.planet;
	},

	getMetadata: function(){
		var space = this.game.space;
		if (!this.metaCached){
			var planet = space.getMeta(this.planet.name, space.planets);
			this.metaCached = space.getMeta(this.id, this.planet.buildings);

		}
		return this.metaCached;
	},

	updateVisible: function(){
		var meta = this.getMetadata();
		if (meta.requiredTech){
			for (var i = meta.requiredTech.length - 1; i >= 0; i--) {
				var tech = this.game.science.get(meta.requiredTech[i]);
				if (!tech.researched){
					this.setVisible(false);
					return;
				}
			}
		}
		this.setVisible(this.getMetadata().unlocked);
	},

});

dojo.declare("classes.ui.space.PlanetPanel", com.nuclearunicorn.game.ui.Panel, {
	planet: null,

	render: function(){
		var content = this.inherited(arguments);

		var self = this;

		dojo.forEach(this.planet.buildings, function(building, i){
			var button = new classes.ui.space.PlanetBuildingBtn({
				id: 		building.name,
				name: 		building.label,
				description: building.description,
				prices: building.prices,
				planet: self.planet
			}, self.game);

			button.render(content);
			self.addChild(button);
		});
	},

	update: function() {
		if (!this.planet.reached && this.planet.unlocked && this.planet.routeDays > 0) {
			var routeSpeed = this.game.getEffect("routeSpeed") != 0 ? this.game.getEffect("routeSpeed") : 1;
			this.title.innerHTML = this.name + " (target in " + Math.round(this.planet.routeDays / routeSpeed) + " days)";
		} else {
			this.title.innerHTML = this.name;
		}

		this.inherited(arguments);
	}

});

dojo.declare("com.nuclearunicorn.game.ui.tab.SpaceTab", com.nuclearunicorn.game.ui.tab, {

	GCPanel: null,
	planetPanels: null,

	constructor: function(){

	},

	render: function(container) {
		var self = this;

		//--------------------------------------------------------------------
		var div = dojo.create("div", { style: { float: "right"}}, container);
		var groupCheckbox = dojo.create("input", {
			id : "toggleResearched",
			type: "checkbox",
			checked: this.game.space.hideResearched
		}, div);

		dojo.connect(groupCheckbox, "onclick", this, function(){
			this.game.space.hideResearched = !this.game.space.hideResearched;

			dojo.empty(container);
			this.render(container);
		});

		dojo.create("label", { innerHTML: "Hide complete missions", for: "toggleResearched"}, div);
		//---------------------------------------------------------------------

		//padding div to preserve markup
		dojo.create("div", { style: { height: "20px"}}, container);

		this.GCPanel = new com.nuclearunicorn.game.ui.Panel("Ground Control", this.game.space);
		var content = this.GCPanel.render(container);

		dojo.forEach(this.game.space.programs, function(program, i){
			var button = new com.nuclearunicorn.game.ui.SpaceProgramBtn({id: program.name}, self.game);
			button.render(content);
			self.GCPanel.addChild(button);
		});

        //------------ space space I'm in space -------------
        this.planetPanels = [];
        dojo.forEach(this.game.space.planets, function(planet, i){
            if (planet.unlocked){

				if (this.game.prestige.getPerk("numerology").researched) {
					var planetTitle = "";
					dojo.forEach(this.game.calendar.cycles, function(cycle, i){
						if (cycle.name == planet.name || (planet.name == "moon" && cycle.name == "redmoon")) {
							planetTitle += cycle.glyph + " ";
						}
					});
					planetTitle += planet.label;
				} else {
					planetTitle = planet.label;
				}

                var planetPanel = new classes.ui.space.PlanetPanel(planetTitle, self.game.space);
                planetPanel.planet = planet;
                planetPanel.setGame(self.game);
                var content = planetPanel.render(container);

                self.planetPanels.push(planetPanel);
            }
        });

		this.update();
	},

	update: function(){
		this.GCPanel.update();

        dojo.forEach(this.planetPanels, function(panel, i){
            panel.update();
        });
	}
});
