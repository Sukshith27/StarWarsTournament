import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import matches from '../data/StarWarsMatches.json';
import {useNavigation} from '@react-navigation/native';
import StarWarsPlayers from '../data/StarWarsPlayers.json';

const MatchesScreen = ({route}) => {
  const {playerId, name} = route.params;
  const players = StarWarsPlayers;
  const [playerMatches, setPlayerMatches] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const filteredMatches = matches
      .filter(
        match => match.player1.id === playerId || match.player2.id === playerId,
      )
      .sort((a, b) => b.match - a.match);

    setPlayerMatches(filteredMatches);
  }, [playerId]);

  const getMatchResult = (match, playerId) => {
    let playerScore, opponentScore;
    if (match.player1.id === playerId) {
      playerScore = match.player1.score;
      opponentScore = match.player2.score;
    } else {
      playerScore = match.player2.score;
      opponentScore = match.player1.score;
    }

    if (playerScore > opponentScore) {
      return {result: 'Win', style: styles.win};
    } else if (playerScore < opponentScore) {
      return {result: 'Loss', style: styles.loss};
    } else {
      return {result: 'Draw', style: styles.draw};
    }
  };

  const renderItem = ({item}) => {
    const player1 = players.find(player => player.id === item.player1.id);
    const player2 = players.find(player => player.id === item.player2.id);
    const {result, style} = getMatchResult(item, playerId);

    return (
      <View style={[styles.item, style]}>
        <View style={{flex: 0.7, flexDirection: 'row'}}>
          <Text style={[styles.match, {flex: 0.5}]}>{player1.name}</Text>
          <Text style={{flex: 0.2}}>{'--'}</Text>
          <Text style={[{flex: 0.5}]}>{player2.name}</Text>
        </View>
        <Text style={styles.score}>
          {item.player1.score} - {item.player2.score}
        </Text>
        <Text style={styles.result}>{result}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableOpacity>
        <View style={styles.playerNameContainer}>
          <Text style={styles.playerName}>{name}</Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <Text style={styles.matchesHeader}>Matches</Text>
      <FlatList
        data={playerMatches}
        keyExtractor={item => item?.match?.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  match: {
    fontSize: 16,
  },
  score: {
    fontSize: 16,
  },
  result: {
    fontSize: 16,
  },
  win: {
    backgroundColor: 'lightgreen',
  },
  loss: {
    backgroundColor: 'salmon',
  },
  draw: {
    backgroundColor: 'lightgrey',
  },
  matchesHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#f2f2f2',
    color: 'black',
  },
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
    color: 'black',
    textAlign: 'center',
  },
  playerNameContainer: {
    marginLeft: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 1,
    backgroundColor: 'gray',
    width: '100%',
  },
  headerContainer: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    alignSelf: 'center',
    marginLeft: 10,
    marginTop: 10,
    padding: 8,
  },
  backButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default MatchesScreen;
