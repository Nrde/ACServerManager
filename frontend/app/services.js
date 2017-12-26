'use strict';

angular.module('acServerManager.services', ['ngResource', 'ngFileUpload']).
    factory('CarService', function($resource) {
        return {
            GetCars: function(callback) {
                var resource = $resource('/api/cars');
                var result = resource.query(function() {
                    callback(result);
                });
            },
			GetSkins: function(car, callback) {
                var resource = $resource('/api/cars/:car');
                var result = resource.get({car: car}, function() {
                    callback(result);
                });
            },
            RemoveCar: function(car, callback) {
                var resource = $resource('/api/cars/:car');
                var result = resource.delete({car: car}, function() {
                    callback(result);
                });
            }
        };
    }).
    factory('RandomService', function($resource) {
        function choice(list) {
            return _.nth(list, _.random(0, list.length - 1));
        }

        function choices(list, num) {
            var randoms = _.slice(list);
            return _.map(_.range(num), function() {
                return _.pullAt(randoms, _.random(0, randoms.length - 1))[0];
            });
        }

        function withUnit(unit) {
            return function(item) {
                return item + unit;
            };
        }

        return {
            choice: choice,
            choices: choices,
            random: _.random,
            valueRandomizer: function(title, scope, keys, min, max, defaultValue, unit) {
                var ticks = _.range(min, max + 1, _.floor(max / 5));
                var randomizer = {
                    range: [min, max],
                    ticks: ticks,
                    ticksLabels: _.map(ticks, withUnit(unit)),
                    title: title,
                    unit: unit,
                    valueMapping: defaultValue,
                    value: defaultValue
                };
                randomizer.callback = function() {
                    var ref = scope;
                    var idx = keys.length - 1;
                    _.forEach(_.slice(keys, 0, idx), function(key) {
                        ref = ref[key];
                    });
                    var value = _.random(min, max);
                    ref[_.last(keys)] = value;
                    randomizer.valueMapping = value;
                };
                return randomizer;
            }
        };
    }).
	factory('TrackService', function($resource) {
        return {
            GetTracks: function(callback) {
                var resource = $resource('/api/tracks');
                var result = resource.query(function() {
                    callback(result);
                });
            },
			GetTrackDetails: function(track, config, callback) {
				if (config) {
					var resource = $resource('/api/tracks/:track/:config');
					var result = resource.get({track: track, config: config}, function() {
						callback(result);
					}, function() {
						callback(null);
					});
				} else {
					var resource = $resource('/api/tracks/:track');
					var result = resource.get({track: track}, function() {
						callback(result);
					}, function() {
						callback(null);
					});
				}
            },
            RemoveTrack: function(track, callback) {
                var resource = $resource('/api/tracks/:track');
                var result = resource.delete({track: track}, function() {
                    callback(result);
                });
            },
        };
    }).
	factory('ServerService', function($resource) {
        return {
            GetServerDetails: function(callback) {
                var resource = $resource('/api/server');
                var result = resource.get(function() {
                    callback(result);
                });
            },
			GetServerDetail: function(id, callback) {
                var resource = $resource('/api/server/:id');
                var result = resource.get({id: id}, function() {
                    callback(result);
                });
            },
			SaveServerDetails: function(data, callback) {
				var resource = $resource('/api/server');
				var result = resource.save(data, function () {
                    callback(result);
                });
			},
			GetServerStatus: function(callback) {
                var resource = $resource('/api/server/status');
                var result = resource.get(function() {
                    callback(result);
                });
            },
        };
    }).
	factory('BookService', function($resource) {
        return {
            GetBookingDetails: function(callback) {
                var resource = $resource('/api/book');
                var result = resource.get(function() {
                    callback(result);
                });
            },
			SaveBookingDetails: function(data, callback) {
				var resource = $resource('/api/book');
				var result = resource.save(data, function () {
                    callback(result);
                });
			}
        };
    }).
	factory('PracticeService', function($resource) {
        return {
            GetPracticeDetails: function(callback) {
                var resource = $resource('/api/practice');
                var result = resource.get(function() {
                    callback(result);
                });
            },
			SavePracticeDetails: function(data, callback) {
				var resource = $resource('/api/practice');
				var result = resource.save(data, function () {
                    callback(result);
                });
			}
        };
    }).
	factory('QualifyService', function($resource) {
        return {
            GetQualifyDetails: function(callback) {
                var resource = $resource('/api/qualify');
                var result = resource.get(function() {
                    callback(result);
                });
            },
			SaveQualifyDetails: function(data, callback) {
				var resource = $resource('/api/qualify');
				var result = resource.save(data, function () {
                    callback(result);
                });
			}
        };
    }).
	factory('RaceService', function($resource) {
        return {
            GetRaceDetails: function(callback) {
                var resource = $resource('/api/race');
                var result = resource.get(function() {
                    callback(result);
                });
            },
			SaveRaceDetails: function(data, callback) {
				var resource = $resource('/api/race');
				var result = resource.save(data, function () {
                    callback(result);
                });
			}
        };
    }).
	factory('DynamicTrackService', function($resource) {
        return {
            GetDynamicTrackDetails: function(callback) {
                var resource = $resource('/api/dynamictrack');
                var result = resource.get(function() {
                    callback(result);
                });
            },
			SaveDynamicTrackDetails: function(data, callback) {
				var resource = $resource('/api/dynamictrack');
				var result = resource.save(data, function () {
                    callback(result);
                });
			}
        };
    }).
	factory('WeatherService', function($resource) {
        return {
            GetWeather: function(callback) {
                var resource = $resource('/api/weather');
                var result = resource.query(function() {
                    callback(result);
                });
            },
			SaveWeather: function(data, callback) {
				var resource = $resource('/api/weather');
				var result = resource.save(data, function () {
                    callback(result);
                });
			}
        };
    }).
	factory('ProcessService', function($resource, $timeout) {
        return {
            ACServerStatus: function(callback) {
                var resource = $resource('/api/acserver/status');
                var result = resource.get(function() {
                    callback(result);
                });
            },
			StartACServer: function (callback) {
                var resource = $resource('/api/acserver');
                var result = resource.save(function () {
                    callback(result);
                });
            },
			StopACServer: function (callback) {
                var resource = $resource('/api/acserver/stop');
                var result = resource.save(function () {
                    callback(result);
                });
            },
			RestartACServer: function (callback) {
                var resource = $resource('/api/acserver/stop');
                var result = resource.save(function () {
					$timeout(function() {
						var resource = $resource('/api/acserver');
						var result = resource.save(function () {
							callback(result);
						});                    
					}, 500);
                });
            },
			STrackerServerStatus: function(callback) {
                var resource = $resource('/api/strackerserver/status');
                var result = resource.get(function() {
                    callback(result);
                });
            },
			StartSTrackerServer: function (callback) {
                var resource = $resource('/api/strackerserver');
                var result = resource.save(function () {
                    callback(result);
                });
            },
			StopSTrackerServer: function (callback) {
                var resource = $resource('/api/strackerserver/stop');
                var result = resource.save(function () {
                    callback(result);
                });
            },
			RestartSTrackerServer: function (callback) {
                var resource = $resource('/api/strackerserver/stop');
                var result = resource.save(function () {
                    var resource = $resource('/api/strackerserver');
					var result = resource.save(function () {
						callback(result);
					});
                });
            }
        };
    }).
	factory('EntryListService', function($resource) {
        return {
            GetEntryList: function(callback) {
                var resource = $resource('/api/entrylist');
                var result = resource.get(function() {
                    callback(result);
                });
            },
			SaveEntryList: function(data, callback) {
                var resource = $resource('/api/entrylist');
                var result = resource.save(data, function() {
                    callback(result);
                });
            }
        };
    }).
	factory('DriverService', function($resource) {
        return {
            GetDrivers: function(callback) {
                var resource = $resource('/api/drivers');
                var result = resource.query(function() {
                    callback(result);
                });
            },
			SaveDriver: function(data, callback) {
                var resource = $resource('/api/drivers');
                var result = resource.save(data, function() {
                    callback(result);
                });
            },
			DeleteDriver: function(guid, callback) {
                var resource = $resource('/api/drivers/:guid');
                var result = resource.delete({guid: guid}, function() {
                    callback(result);
                });
            }
        };
    }).
	factory('TyreService', function($resource) {
        return {
            GetTyres: function(cars, callback) {
                var resource = $resource('/api/tyres');
                var result = resource.get({cars: cars}, function() {
                    callback(result);
                });
            }
        };
    }).
    factory('TemplateService', function($resource) {
        return {
            GetTemplates: function(callback) {
                var resource = $resource('/api/templates');
                var result = resource.query(function() {
                    callback(result);
                });
            },
            LoadTemplate: function(template, callback) {
                var resource = $resource('/api/templates/:uuid');
                var result = resource.save({uuid: template.uuid}, template, function() {
                    callback(result);
                });
            },
            RemoveTemplate: function(template, callback) {
                var resource = $resource('/api/templates/:uuid');
                var result = resource.delete({uuid: template.uuid}, function() {
                    callback(result);
                });
            },
            SaveCurrent: function(template, callback) {
                var resource = $resource('/api/templates');
                var result = resource.save(template, function() {
                    callback(result);
                });
            }
        };
    });
