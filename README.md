# eth_game

## General info about the project
In this repository you can see my version of the game coded as part of the course "Ethereum Game Programming" at Moralis Academy.
For the game animation Phaser 3.15.1 was used. The sprites were provided as part of the course.

The Game is deployed on the Goerli Test Network.

## How does it work
You play as a knight and have to collect as many coins as possible. You can control the Knight with the arrow keys on your keyboard and jump with the space bar.
After the course project was finished as intended I changed a few things. Now at the end of every Game you get the number of Tokens you aquired as an ERC20 Token with the name "GameCoin" and the Ticker "GCT".
The boosts you aquire in the game are ERC1155 Tokens and change the behaviour of the game, like increasing speed, increasing coin generation and slowing the timer.
With this ERC20 Token you can buy the ERC1155 boost tokens.
At login your items get retrieved and you are asked to confirm that the Market Contract my use your tokens.

## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (Frontend & Testing)
- [Phaser](https://phaser.io/) (Game Framework)
- [Ethers](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [Truffle](https://trufflesuite.com/docs/truffle/) (Development Framework)
- [Ganache](https://trufflesuite.com/docs/ganache//) (Development personal Blockchain)

## Disclaimer
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
