# How to install
Just run `npm i` to install the packages and then run `npm run start` (In my case I used `pnpm`, hence that lock file)

The client connects on port `1883` and subscribes to the child topics it fetches from a "mock api".

It keeps an array for the status of each inverter which is initially set to 1 to indicate that there are no problems.

If a 0 or 1 get sent, the index location that mirrors the topic location, gets either set to 0 or stays at 1.

If every value in the array is set to 1, A value of "1" gets published to the parent topic indicating no issue, otherwise if there is a 0, a "0" gets published indicating an error for one of the inverters.