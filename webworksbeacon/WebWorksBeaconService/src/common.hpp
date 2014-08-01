/*
 * Copyright (c) 2013-2014 BlackBerry Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#ifndef COMMON_HPP_
#define COMMON_HPP_

#define BEACON_EXPIRY_INTERVAL_SECONDS (5*60)
#define BEACON_EXPIRY_SCAN_INTERVAL_MS (3*60*1000)
#define WAKEME_INVOKE_HEADLESS_SERVICE "com.example.WebWorksBeaconService"
#define WAKEME_INVOKE_GUI "com.example.WebWorksBeacon"

#define WAKEME_INVOKE_ACTION_RESET "com.example.WebWorksBeaconService.RESET"
#define WAKEME_INVOKE_ACTION_STOPSERVICE "com.example.WebWorksBeaconService.STOPSERVICE"
#define WAKEME_INVOKE_ACTION_ADDSCAN "com.example.WebWorksBeaconService.ADDSCAN"
#define WAKEME_INVOKE_ACTION_REMOVESCAN "com.example.WebWorksBeaconService.REMOVESCAN"
#define WAKEME_INVOKE_ACTION_ENABLESCANINVOKE "com.example.WebWorksBeaconService.ENABLESCANINVOKE"
#define WAKEME_INVOKE_ACTION_DISABLESCANINVOKE "com.example.WebWorksBeaconService.DISABLESCANINVOKE"
#define WAKEME_INVOKE_ACTION_SCANRESULT "bb.action.bluetooth.SCANRESULT"
#define WAKEME_INVOKE_ACTION_STARTSERVICE "bb.action.START"
#define WAKEME_INVOKE_ACTION_STARTAPP  "bb.action.START"

#define WAKEME_HEADLESS_SOCKET_SERVER_NAME "WebWorksBeaconServiceSocket"
#define WAKEME_HEADLESS_SOCKET_SERVER_RETRY_INTERVAL_MS (2*1000)
#define WAKEME_HEADLESS_SOCKET_SERVER_MAX_RETRY_INTERVAL_MS (30*1000)

#define DEFAULT_BLUETOOTH_ADDRESS "00:00:00:00:00:00"

#endif /* COMMON_HPP_ */
