//

import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux'
import store from '../app/store'
import { StatusBar } from 'expo-status-bar';

import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import AuthStack from './AuthStack';

import HomeScreen from '../routes/adminBottomNav';
import SupplyScreen from '../routes/supplierBottomNav';
import VolunteerHomeScreen from '../routes/volunteerBottomNav';



import { IconButton } from '../components';


//Logout button styling as different from login one
const buttonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e93b81',
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    maxHeight: "3%",
  },
  
});

//Grab Firebase auth so we can logout when needed
const auth = Firebase.auth();

export default function RootNavigator() {

  //user hook takes its value from wrapper it is enclosed it (starting at null)
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  //async auth.signout called when user chooses to log off
  const handleSignOut = async () => {
    try {
      await auth.signOut();

      // display error if unable to do so 
    } catch (error) {
      console.log(error);
    }
  };

  //if the auth state changes, we set the user to authenticated or null, depending on what it's changed to
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });

    //unsubscribe auth listener
    return unsubscribeAuth;
  }, []);

  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  
  //If the user has a value (i.e is logged in)
  if(user){

    //Check to see what user we are dealing with
    switch(user.email){

      //If user is the admin, we display the HomeScreen
      //This gives the user access to adding fridges, as well as seeing the current list of fridges
      //There is also a logout button at the bottom of the page to logout/allow another user to login
      case "admin@fridges.org":

        return (
          <NavigationContainer>
            <Provider store={store}>
              <HomeScreen />

              <StatusBar style="auto" />

                <View style={buttonStyles.container}>
                  <IconButton
                    name='logout'
                    size={20}
                    color='##24a0ed'
                    onPress={handleSignOut}
                  />
                </View>

            </Provider>
          </NavigationContainer>
        )

      //If user is a supplier, we display the SupplyScreen
      //This gives the user access to adding stock, as well as seeing the current list of stock
      //There is also a logout button at the bottom of the page to logout/allow another user to login
      case "supplier@fridges.org":
        return (
          <NavigationContainer>
            <Provider store={store}>
              <SupplyScreen />

              <StatusBar style="auto" />
              
                <View style={buttonStyles.container}>
                  <IconButton
                    name='logout'
                    size={20}
                    color='##24a0ed'
                    onPress={handleSignOut}
                  />
                </View>

            </Provider>
          </NavigationContainer>
        )
        
        //If user is neither admin or supplier, then they are volunteers, and are given the VolunteerHomeScreen
        //This gives the user access to the lists of fridges and stocks
        //There is also a logout button at the bottom of the page to logout/allow another user to login
        default:
          return(
            <NavigationContainer>
            <Provider store={store}>
              <VolunteerHomeScreen />

              <StatusBar style="auto" />
              
                <View style={buttonStyles.container}>
                  <IconButton
                    name='logout'
                    size={20}
                    color='##24a0ed'
                    onPress={handleSignOut}
                  />
                </View>

            </Provider>
          </NavigationContainer>
          )

    }
  
  //If they aren't logged in, we keep then at the login page (AuthStack)
  } else {
    return(
      <NavigationContainer>
       <AuthStack />
      </NavigationContainer>
    )
  }

}

//If statement in case you need to sample from an array rather than 1 email
/*
  if(user){
    
    // If user is admin
    if(user.email == "admin@fridges.org"){

      console.log('admin active');

      return (
        <NavigationContainer>
          <Provider store={store}>
            <HomeScreen />

            <StatusBar style="auto" />
            
              <View style={buttonStyles.container}>
                <IconButton
                  name='logout'
                  size={20}
                  color='##24a0ed'
                  onPress={handleSignOut}
                />
              </View>

          </Provider>
        </NavigationContainer>
      );

    } else {
      return (
        <NavigationContainer>
         <Authstack />
        </NavigationContainer>
      );
    }
    
    
  } else {
    return(
      <NavigationContainer>
       <AuthStack />
      </NavigationContainer>
    )

  }
  
} */

  
