import { useState, useRef } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function OtpScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const { signIn } = useAuth();
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  const handleVerify = () => {
    if (code.length !== 6) return;
    // In real app: call POST /api/auth/verify-otp
    // Dev mode: code 000000 always works
    signIn("mock-jwt-token");
    router.replace("/(tabs)");
  };

  const handleCodeChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(cleaned);
    if (cleaned.length === 6) {
      setTimeout(handleVerify, 100);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center px-6">
        <Pressable onPress={() => router.back()} className="mb-8">
          <Text className="text-blue-600 text-base">Back</Text>
        </Pressable>

        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Enter code
        </Text>
        <Text className="text-base text-gray-500 mb-8">
          We sent a 6-digit code to {email}
        </Text>

        <Pressable onPress={() => inputRef.current?.focus()}>
          <View className="flex-row justify-between mb-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <View
                key={i}
                className={`w-12 h-14 rounded-xl items-center justify-center ${
                  code.length === i
                    ? "border-2 border-blue-600 bg-blue-50"
                    : "bg-gray-100"
                }`}
              >
                <Text className="text-2xl font-bold text-gray-900">
                  {code[i] || ""}
                </Text>
              </View>
            ))}
          </View>
        </Pressable>

        <TextInput
          ref={inputRef}
          className="absolute opacity-0"
          keyboardType="number-pad"
          maxLength={6}
          value={code}
          onChangeText={handleCodeChange}
          autoFocus
        />

        <Pressable
          onPress={handleVerify}
          className={`h-14 rounded-xl items-center justify-center ${
            code.length === 6 ? "bg-blue-600 active:bg-blue-700" : "bg-gray-200"
          }`}
        >
          <Text
            className={`text-base font-semibold ${
              code.length === 6 ? "text-white" : "text-gray-400"
            }`}
          >
            Verify
          </Text>
        </Pressable>

        <Pressable className="mt-4 items-center">
          <Text className="text-blue-600 text-sm">Resend code</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
