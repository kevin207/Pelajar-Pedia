import 'package:flutter/material.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({Key? key}) : super(key: key);

  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
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
                      "Register Page",
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
                    'Register',
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
                  Text("Already Have An Acount?"),
                  SizedBox(
                    width: 5,
                  ),
                  GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(context, '/');
                    },
                    child: Text(
                      "Sign In",
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
