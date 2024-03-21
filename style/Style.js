import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',

  },
  icon: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  ruleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rulesText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  goodLuck: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  infoText: {
    marginTop: 10,
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  gameInfo: {
    marginBottom: 20,
  },
  playerInfo: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  endGame: {
    marginTop: 20,
    alignItems: 'center',
  },
  leftTopButton: {
    position: 'absolute',
    top: 30,
    left: 30,
    zIndex: 1, 
  },
  pointsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  pointsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pointsList: {
    alignItems: 'center',
  },
  point: {
    fontSize: 18,
    marginBottom: 5,
  },
  diceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  diceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  diceList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dice: {
    fontSize: 24,
    marginRight: 10,
  },
  scoreboardEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});
