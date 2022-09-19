import 'package:flutter/material.dart';

//Screens
import 'package:auth/screens/login_screen.dart';
import 'package:auth/screens/register_screen.dart';
import 'package:auth/screens/splash_screen.dart';
import 'package:auth/screens/home_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: Future.delayed(Duration(seconds: 1)),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const SplashScreen();
          } else {
            return MaterialApp(
              debugShowCheckedModeBanner: false,
              routes: {
                '/': (context) => LoginScreen(),
                '/home': (context) => HomeScreen(),
                '/register': (context) => RegisterScreen(),
              },
            );
          }
        });
  }
}
