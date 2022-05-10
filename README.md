# GTPS Status Watcher
## Installing TypeScript Compiler
- Type in console command `npm install -g typescript`
- Type `tsc --version` to check the current installed version
## Setup
- The bot was made with TypeScript. Therefore, before running the bot, you must compile it to JavaScript code by typing `tsc` (The `tsconfig.json` will handle all the compilation works). 
- The compiled TypeScript code will be at `Compiled`  directory with the same name. 
- Type `node .` to run the code
- Make sure you have your bot token placed at the proper place
- Make sure you have set the directory to the executeable file

## File formatting
The bot only accepts `.json` file. So do note that you need to create a file with name `players.json` with the following format:
```json
{ "onlinePlayers": 0 }
```
The following code example can be used as reference to create the `json` file in Growtopia Private Server codebases. 
```cpp
int totalPlayers = 0;
for (ENetPeer* peers = server->peers; peers < &server->peers[server->peerCount]; currentPeer++) {
	if (peers->state != ENET_PEER_STATE_CONNECTED) continue;
	totalPlayers++;
}

nlohmann::json json;
json["onlinePlayers"] = totalPlayers;

std::ofstream fstream("path/to/players.json");
fstream << json;
```
