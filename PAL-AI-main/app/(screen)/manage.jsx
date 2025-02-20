import React, { useState } from "react";
import { TouchableOpacity, TextInput, Alert, Modal, View, Text, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { images } from "../../constants";
import Feather from "react-native-vector-icons/Feather";
import { useAuth } from "../../context/AuthContext";

const API_URL = 'https://pal-ai-database-api-sea-87197497418.asia-southeast1.run.app';

const ManageAccount = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterNewPassword, setReEnterNewPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailVerificationPassword, setEmailVerificationPassword] = useState("");
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError] = useState("");
  const { user } = useAuth();

  const [passwordErrors, setPasswordErrors] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (password, type) => {
    if (type === 'new') {
      setNewPassword(password);
      if (!validatePassword(password)) {
        setPasswordErrors(prev => ({
          ...prev,
          newPassword: "Password must be at least 8 characters long, contain 1 uppercase letter, 1 number, and 1 special character."
        }));
      } else {
        setPasswordErrors(prev => ({ ...prev, newPassword: "" }));
      }
    } else if (type === 'confirm') {
      setReEnterNewPassword(password);
      if (password !== newPassword) {
        setPasswordErrors(prev => ({
          ...prev,
          confirmPassword: "Passwords don't match."
        }));
      } else {
        setPasswordErrors(prev => ({ ...prev, confirmPassword: "" }));
      }
    }
  };

  const handleDeleteAccount = () => {
    if (!deletePassword) {
      Alert.alert("Error", "Please enter your password to confirm deletion.");
      return;
    }

    // Here you would verify the password with your backend
    // For now, we'll simulate the verification
    Alert.alert("Account Deleted", "Your account has been deleted.");
    setModalVisible(false);
    router.push("/signin");
  };

  const handleChangePassword = async () => {
    if (!currentPassword) {
        Alert.alert("Error", "Please enter your current password.");
        return;
    }

    if (passwordErrors.newPassword || passwordErrors.confirmPassword) {
        Alert.alert("Error", "Please fix password errors before proceeding.");
        return;
    }

    if (newPassword !== reEnterNewPassword) {
        Alert.alert("Error", "New passwords do not match.");
        return;
    }

    try {
        // Show loading indicator
        setIsLoading(true);

        const response = await fetch(`${API_URL}/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id, 
                currentPassword,
                newPassword
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to change password');
        }

        // Success case
        Alert.alert("Success", "Your password has been changed successfully.");
        setShowPasswordForm(false);
        setCurrentPassword("");
        setNewPassword("");
        setReEnterNewPassword("");

    } catch (error) {
        Alert.alert("Error", error.message || "Failed to change password. Please try again.");
    } finally {
        setIsLoading(false);
    }
};

  const handleEmailChange = async () => {
    if (!emailVerificationPassword) {
        Alert.alert("Error", "Please enter your current password.");
        return;
    }

    if (!newEmail) {
        Alert.alert("Error", "Please enter a new email address.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
        Alert.alert("Error", "Please enter a valid email address.");
        return;
    }

    try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/verify-email-change`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                password: emailVerificationPassword,
                newEmail
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to initiate email change');
        }

        setOtpModalVisible(true);

    } catch (error) {
        Alert.alert("Error", error.message || "Failed to initiate email change. Please try again.");
    } finally {
        setIsLoading(false);
    }
};

const handleVerifyOtp = async () => {
    if (!otpCode) {
        Alert.alert("Error", "Please enter the OTP code.");
        return;
    }

    try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/confirm-email-change`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                otp: otpCode
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to verify OTP');
        }

        Alert.alert("Success", "Your email has been changed successfully.");
        setOtpModalVisible(false);
        setShowEmailForm(false);
        setNewEmail("");
        setOtpCode("");
        setEmailVerificationPassword("");

    } catch (error) {
        Alert.alert("Error", error.message || "Failed to verify OTP. Please try again.");
    } finally {
        setIsLoading(false);
    }
};

  const commonInputStyle = {
    borderWidth: 1,
    borderColor: '#474747',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  };

  const renderPasswordForm = () => (
    <View className="m-3">
      <TextInput
        style={commonInputStyle}
        placeholder="Current Password"
        placeholderTextColor="#474747"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={commonInputStyle}
        placeholder="New Password"
        placeholderTextColor="#474747"
        secureTextEntry
        value={newPassword}
        onChangeText={(text) => handlePasswordChange(text, 'new')}
      />
      {passwordErrors.newPassword ? (
        <Text className="text-red-500 mb-2">{passwordErrors.newPassword}</Text>
      ) : null}
      <TextInput
        style={commonInputStyle}
        placeholder="Re-enter New Password"
        placeholderTextColor="#474747"
        secureTextEntry
        value={reEnterNewPassword}
        onChangeText={(text) => handlePasswordChange(text, 'confirm')}
      />
      {passwordErrors.confirmPassword ? (
        <Text className="text-red-500 mb-2">{passwordErrors.confirmPassword}</Text>
      ) : null}
      <Button
        mode="contained"
        style={{ borderRadius: 5, marginBottom: 10 }}
        onPress={handleChangePassword}
      >
        Change Password
      </Button>
    </View>
  );

  const handleBack = () => {
    router.back();
  };

  return (
    <ImageBackground
    source={images.background_profile}
    className="flex-1 h-full w-full bg-white"
    >
      <ScrollView className="mt-12">
        <SafeAreaView className="px-7 w-full h-full mb-10">
          {/* New Header */}
          <View className="flex-row items-center w-full mb-7">
           <Feather
              name="chevron-left"
              size={40}
              color="black"
              onPress={handleBack}
            />
            <Text className="font-pmedium text-[30px]">Manage</Text>
          </View>

          <View className="flex-col rounded-[5px] border border-[#474747] mt-5">
            <View className="flex-row justify-between m-3">
              <Text className="text-lg">Email</Text>
              <TouchableOpacity onPress={() => setShowEmailForm(!showEmailForm)}>
                <Text className="text-lg underline">Change Email</Text>
              </TouchableOpacity>
            </View>
            {showEmailForm && (
              <View className="m-3">
                <TextInput
                  style={commonInputStyle}
                  placeholder="Current Password"
                  placeholderTextColor="#474747"
                  secureTextEntry
                  value={emailVerificationPassword}
                  onChangeText={setEmailVerificationPassword}
                />
                <TextInput
                  style={commonInputStyle}
                  placeholder="New Email"
                  placeholderTextColor="#474747"
                  value={newEmail}
                  onChangeText={setNewEmail}
                />
                <Button
                  mode="contained"
                  style={{ borderRadius: 5, marginBottom: 10 }}
                  onPress={handleEmailChange}
                >
                  Send OTP
                </Button>
              </View>
            )}
            
            <View className="flex-row justify-between mb-3 mx-3">
              <Text className="text-lg">Password</Text>
              <TouchableOpacity onPress={() => setShowPasswordForm(!showPasswordForm)}>
                <Text className="text-lg underline">Change Password</Text>
              </TouchableOpacity>
            </View>
            {apiError ? (
              <Text className="text-red-500 mb-4 text-center">{apiError}</Text>
            ) : null}
            {showPasswordForm && renderPasswordForm()}
          </View>

          <Button
            mode="outlined"
            style={{ borderRadius: 5, marginTop: 10 }}
            contentStyle={{ justifyContent: "flex-start" }}
            labelStyle={{ fontSize: 18, color: "red" }}
            onPress={() => setModalVisible(true)}
          >
            Delete Account
          </Button>
        </SafeAreaView>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ width: 300, padding: 20, backgroundColor: "white", borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Enter your password to confirm account deletion:</Text>
            <TextInput
              style={commonInputStyle}
              placeholder="Enter Password"
              placeholderTextColor="#474747"
              secureTextEntry
              value={deletePassword}
              onChangeText={setDeletePassword}
            />
            <Button
              mode="contained"
              style={{ borderRadius: 5, marginBottom: 10 }}
              onPress={handleDeleteAccount}
            >
              Delete Account
            </Button>
            <Button
              mode="outlined"
              style={{ borderRadius: 5 }}
              onPress={() => setModalVisible(false)}
            >
              Cancel
            </Button>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={otpModalVisible}
        onRequestClose={() => setOtpModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ width: 300, padding: 20, backgroundColor: "white", borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Enter OTP Code:</Text>
            <TextInput
              style={commonInputStyle}
              placeholder="OTP Code"
              placeholderTextColor="#474747"
              value={otpCode}
              onChangeText={setOtpCode}
            />
            <Button
              mode="contained"
              style={{ borderRadius: 5, marginBottom: 10 }}
              onPress={handleVerifyOtp}
            >
              Verify OTP
            </Button>
            <Button
              mode="outlined"
              style={{ borderRadius: 5 }}
              onPress={() => setOtpModalVisible(false)}
            >
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default ManageAccount;