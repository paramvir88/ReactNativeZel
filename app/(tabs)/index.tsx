import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { gql, useQuery } from '@apollo/client'
import {FlatList, Image} from 'react-native';
import { AppRegistry, Pressable, SafeAreaView } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, HttpLink } from '@apollo/client';
import { Amplify } from 'aws-amplify';


const BASE_URL = 'https://api.graphql.guide/graphql';

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: 'https://prrwjjssnvhpbcdwbcwx3nm3zm.appsync-api.ap-southeast-2.amazonaws.com/graphql',
      region: 'ap-southeast-2',
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-psmv7fcrw5dlpmp5orner2xf7i'
    }
  }
});

// const client = new AWSAppSyncClient({
//   /* The HTTPS endpoint of the AWS AppSync API 
//   (e.g. *https://aaaaaaaaaaaaaaaaaaaaaaaaaa.appsync-api.us-east-1.amazonaws.com/graphql*). 
//   [Custom domain names](https://docs.aws.amazon.com/appsync/latest/devguide/custom-domain-name.html) can also be supplied here (e.g. *https://api.yourdomain.com/graphql*). 
//   Custom domain names can have any format, but must end with `/graphql` 
//   (see https://graphql.org/learn/serving-over-http/#uris-routes). */
//   url: 'https://prrwjjssnvhpbcdwbcwx3nm3zm.appsync-api.ap-southeast-2.amazonaws.com/graphql',
//   region: 'ap-southeast-2',
//   auth: {
//     type: 'API_KEY',
//     apiKey: 'da2-psmv7fcrw5dlpmp5orner2xf7i',
//     // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. Token object is obtained previously
//     // credentials: async () => credentials, // Required when you use IAM-based auth.
//   },
// });


const client1 = new ApolloClient({
  
  uri: BASE_URL,
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ApolloProvider client={client1}>
        <JobList />
      </ApolloProvider>
    </SafeAreaView>
  );
}

export function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab On</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <JobList />
    </View>
  );
}


const CHAPTERS_QUERY = gql`
  query Chapters {
    chapters {
      id
      number
      title
    }
  }
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eee',
  },
  jobInfo: {
    flex: 1,
    padding: 10,
  },
  jobCard: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    margin: 4,
    padding: 8,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobCompany: {
    fontSize: 16,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
  },
  errorText: {
    color: '#ce2727',
  },
});


function JobList() {
  const {data, loading, error} = useQuery(CHAPTERS_QUERY);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.infoText, styles.errorText]}>
          Error: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={data.chapters}
      renderItem={({item}) => (
        <View style={styles.jobCard}>
          <View style={styles.jobInfo}>
            <Text style={styles.jobTitle}>{item.title}</Text>
          </View>
        </View>
      )}
    />
  );
}



