import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import matches from '../data/StarWarsMatches.json';
import {updatePlayerPoints} from '../utils/helperFunctions';
import players from '../data/StarWarsPlayers.json';

const PointsTableScreen = ({navigation}) => {
  const sortedPlayers = updatePlayerPoints(players, matches).sort(
    (a, b) => b.points - a.points,
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('Matches', {playerId: item.id, name: item.name})
      }>
      <Image source={{uri: item?.icon}} style={styles.icon} />
      <Text style={styles.name}>{item?.name}</Text>
      <Text style={styles.points}>{item?.points}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Star Wars Blaster Tournament</Text>
      <View style={styles.line}></View>
      <Text style={styles.subHeader}>Points Table</Text>
      <FlatList
        data={sortedPlayers}
        keyExtractor={item => item?.id?.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#f2f2f2',
    color: 'black',
    textAlign: 'center',
  },
  line: {
    height: 1,
    backgroundColor: 'gray',
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 18,
    color: 'black',
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#f2f2f2',
    color: 'black',
  },
});

export default PointsTableScreen;
