/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var bgGeo;
var startTrackingLocation = function() {
    console.log(bgGeo);
    bgGeo.onLocation(function(location) {
        console.log('[location] -', location);
    });
    
    bgGeo.onMotionChange(function(event) {
        console.log('[motionchange] -', event.isMoving, event.location);
    });
    
    bgGeo.onHttp(function(response) {
        console.log('[http] - ', response.success, response.status, response.responseText);
    });
    
    bgGeo.onProviderChange(function(event) {
        console.log('[providerchange] -', event.status, event.enabled, event.gps, event.network);
    });

    bgGeo.getState(function(state) {
        console.log(state);
        if (!state.enabled) {
            bgGeo.start().then(function() {
                console.log('- BackgroundGeolocation tracking started');
            });
        }
    })
};
var initTrackingLocation = function () {
    bgGeo = window.BackgroundGeolocation;

    // 2. Execute #ready method:
    bgGeo.ready({
        reset: true,
        debug: true,
        logLevel: bgGeo.LOG_LEVEL_VERBOSE,
        desiredAccuracy: bgGeo.DESIRED_ACCURACY_HIGH,
        distanceFilter: 1,
        foregroundService: true,
        title: 'Tracking location',
        text: 'Location service activated',
        autoSync: true,
        stopOnTerminate: false,
        startOnBoot: true
    }, function(state) {    // <-- Current state provided to #configure callback
        console.log('BackgroundGeolocation is configured and ready to use', state);
    });
};


var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('pause', this.onPause.bind(this), false);
        document.addEventListener('resume', this.onResume.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        initTrackingLocation();
    },
    onPause: function() {
        console.log('App is paused');
        BackgroundGeolocation.removeListeners(function() {
            startTrackingLocation();
        }, function() {
            startTrackingLocation();
        });
    },
    onResume: function() {
        console.log('App is resumed');
        BackgroundGeolocation.stop().then(function() {
            console.log('[INFO] Background Location stop');
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();