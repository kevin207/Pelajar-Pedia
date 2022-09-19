// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  // Get what user is typing
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(height: 30),
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 50),
                alignment: Alignment.center,
                child: Column(
                  children: [
                    Image.asset('assets/images/login.jpg'),
                    SizedBox(height: 10),
                    Text(
                      "Login Page",
                      style: TextStyle(
                          fontSize: 40,
                          fontWeight: FontWeight.bold,
                          color: Colors.greenAccent),
                    )
                  ],
                ),
              ),
              SizedBox(height: 20),
              Container(
                alignment: Alignment.center,
                margin: const EdgeInsets.symmetric(horizontal: 50),
                child: Column(
                  children: [
                    TextField(
                      controller: _emailController,
                      decoration: InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: "Username/Email",
                          suffixIcon: IconButton(
                            onPressed: () {
                              _emailController.clear();
                            },
                            icon: Icon(
                              Icons.clear,
                              size: 20,
                            ),
                          )),
                    ),
                    SizedBox(height: 10),
                    TextField(
                      obscureText: true,
                      controller: _passwordController,
                      decoration: InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: "Password",
                          suffixIcon: IconButton(
                            onPressed: () {
                              _passwordController.clear();
                            },
                            icon: Icon(
                              Icons.clear,
                              size: 20,
                            ),
                          )),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 25),
              TextButton(
                style: TextButton.styleFrom(
                  backgroundColor: Colors.greenAccent,
                ),
                onPressed: () {
                  // Navigator.pushNamed(context, '/home');
                },
                child: Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 30, vertical: 5),
                  child: Text(
                    'Login',
                    style: TextStyle(color: Colors.white, fontSize: 20),
                  ),
                ),
              ),
              SizedBox(
                height: 30,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text("Doesn't Have Acount?"),
                  SizedBox(
                    width: 5,
                  ),
                  GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(context, '/register');
                    },
                    child: Text(
                      "Create Acount",
                      style: TextStyle(
                          color: Colors.blueAccent,
                          decoration: TextDecoration.underline),
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
