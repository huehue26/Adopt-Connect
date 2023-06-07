import 'package:adoptconnect_app/constants/global_variables.dart';
import 'package:adoptconnect_app/widgets/text_input.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({super.key});

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _userIdController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  String _userIdErrorText = "";
  String _passwordErrorText = "";

  @override
  void dispose() {
    _userIdController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            "Welcome",
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 30),
          InputText(
            labelText: "User Id",
            controller: _userIdController,
            errorText: _userIdErrorText,
          ),
          const SizedBox(height: 20),
          InputText(
            labelText: "Password",
            isPassword: true,
            controller: _passwordController,
            errorText: _passwordErrorText,
          ),
          const SizedBox(height: 50),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
                minimumSize: const Size(double.infinity, 40),
                textStyle: const TextStyle(fontSize: 18),
                padding: const EdgeInsets.symmetric(vertical: 14)),
            child: const Text(
              "LOGIN",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(height: 20),
          Align(
            alignment: Alignment.centerLeft,
            child: RichText(
              text: TextSpan(
                  text: "Forgot Password?",
                  style: const TextStyle(
                      color: GlobalVariables.primaryColor, fontSize: 16),
                  recognizer: TapGestureRecognizer()..onTap = () {}),
            ),
          ),
        ],
      ),
    );
  }
}