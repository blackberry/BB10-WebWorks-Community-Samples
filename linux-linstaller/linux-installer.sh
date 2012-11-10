#!/bin/sh

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
 
DIR=`dirname "$0"`
LN="$DIR/third_party/node/linux/node"
CN="$DIR/node/out/Release/node"
clear
showMenu(){
	echo "######################################################################"
	echo "# This is a script to compile the webworks sdk from source for linux #"
	echo "# You will need to have the Native SDK and CMake install already     #"
	echo "######################################################################"
	echo
	echo "----------------------------------------------"
	echo "Press the number for the option you would like"
	echo "----------------------------------------------"	
	echo "[1] Download the WebWroks source and every thing needed"
	echo "[2] Compile the WebWorks SDK"
	echo "[3] Exit"
}
while [ 1 ]
do
	showMenu
	read -p "Please enter a number: " NUM
		case "$NUM" in
				"1")
					git clone https://github.com/blackberry/BB10-Webworks-Packager.git webworks-temp
					cd $DIR/webworks-temp
					# I have the dependencies on github untill RIM/Blackberry has a better way for linux users to get them
					git clone https://github.com/badtoyz/webworks-dependencies.git dependencies
					git clone https://github.com/blackberry/BB10-WebWorks-Framework.git Framework
					git clone https://github.com/joyent/node.git node
					mkdir $DIR/Framework/dependencies/webplatform/framework; mkdir $DIR/Framework/dependencies/webplatform/framework/clientFiles
					mv $DIR/dependencies/webplatform.js $DIRl/Framework/dependencies/webplatform/framework/clientFiles/
					cd ..
					clear
					;;
	
				"2")
					if [ -d "$DIR/webworks-temp" ];then
						echo "You will be asked to enter the root password for system wide dependencies"
						cd $DIR/webworks-temp/node; ./configure; make clean; make; sudo make install; cd ..
						cp $CN $LN
						./configure; jake; cd ..
						mkdir BB10-webworks-sdk; mv -f $DIR/webworks-temp/target/zip/* $DIR/BB10-webworks-sdk/
						rm -rf $DIR/webworks-temp
						echo "The WebWorks SDK is done and can be found $DIR/BB10-webworks-sdk"
					else
						read -p "Please do option 1 first. Press Enter" a
						clear
					fi
					;;
				"3")
					exit
					;;
			esac 
done
