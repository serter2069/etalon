import { useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";

export default function EmailScreen() {
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    if (!email.trim()) return;
    // In real app: call POST /api/auth/request-otp
    router.push({ pathname: "/(auth)/otp", params: { email } });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome</Text>
        <Text className="text-base text-gray-500 mb-8">
          Enter your email to continue
        </Text>

        <TextInput
          className="h-14 rounded-xl bg-gray-100 px-4 text-base text-gray-900"
          placeholder="your@email.com"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={handleContinue}
        />

        <Pressable
          onPress={handleContinue}
          className="mt-4 h-14 rounded-xl bg-blue-600 items-center justify-center active:bg-blue-700"
        >
          <Text className="text-white text-base font-semibold">Continue</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
