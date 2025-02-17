import React, { useState } from "react";
import { TouchableOpacity, TextInput, Alert, Modal, View, Text, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { images } from "../../constants";

const ManageAccount = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterNewPassword, setReEnterNewPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleDeleteAccount = () => {
    if (deleteText === "Delete") {
      // Perform account deletion logic here
      Alert.alert("Account Deleted", "Your account has been deleted.");
      setModalVisible(false);
      router.push("/signin"); // Navigate to the sign-in screen
    } else {
      Alert.alert("Error", "Please type 'Delete' to confirm.");
    }
  };

  const handleChangePassword = () => {
    if (newPassword !== reEnterNewPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }
    // Perform password change logic here
    Alert.alert("Password Changed", "Your password has been changed.");
  };

  const handleSendOtp = () => {
    // Perform OTP sending logic here
    setOtpModalVisible(true);
  };

  const handleVerifyOtp = () => {
    // Perform OTP verification logic here
    Alert.alert("Email Changed", "Your email has been changed.");
    setOtpModalVisible(false);
  };

  return (
    <ImageBackground
      source={images.background_profile}
      className="flex-1 h-full w-full bg-white"
    >
      <ScrollView className="mt-12">
        <SafeAreaView className="px-7 w-full h-full mb-10">
          <View className="flex-row items-center w-full mb-3">
            <Text className="font-pmedium text-[30px]">Manage Account</Text>
          </View>

          <View className="flex-col rounded-[5px] border border-[#474747] mt-5">
            <View className="flex-row justify-between m-3">
              <Text className="text-lg">Email</Text>
              <TouchableOpacity onPress={() => setShowEmailForm(!showEmailForm)}>
                <Text className="text-lg underline">angelogwapo@gmail.com</Text>
              </TouchableOpacity>
            </View>
            {showEmailForm && (
              <View className="m-3">
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#474747',
                    borderRadius: 5,
                    padding: 10,
                    fontSize: 18,
                    color: 'black',
                    marginBottom: 10,
                  }}
                  placeholder="New Email"
                  placeholderTextColor="#474747"
                  value={newEmail}
                  onChangeText={setNewEmail}
                />
                <Button
                  mode="contained"
                  style={{ borderRadius: 5, marginBottom: 10 }}
                  onPress={handleSendOtp}
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
            {showPasswordForm && (
              <View className="m-3">
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#474747',
                    borderRadius: 5,
                    padding: 10,
                    fontSize: 18,
                    color: 'black',
                    marginBottom: 10,
                  }}
                  placeholder="Current Password"
                  placeholderTextColor="#474747"
                  secureTextEntry
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                />
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#474747',
                    borderRadius: 5,
                    padding: 10,
                    fontSize: 18,
                    color: 'black',
                    marginBottom: 10,
                  }}
                  placeholder="New Password"
                  placeholderTextColor="#474747"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#474747',
                    borderRadius: 5,
                    padding: 10,
                    fontSize: 18,
                    color: 'black',
                    marginBottom: 10,
                  }}
                  placeholder="Re-enter New Password"
                  placeholderTextColor="#474747"
                  secureTextEntry
                  value={reEnterNewPassword}
                  onChangeText={setReEnterNewPassword}
                />
                <Button
                  mode="contained"
                  style={{ borderRadius: 5, marginBottom: 10 }}
                  onPress={handleChangePassword}
                >
                  Change Password
                </Button>
              </View>
            )}
          </View>

          <Button
            mode="outlined"
            style={{ borderRadius: 5, marginTop: 10 }} // Set corner radius
            contentStyle={{ justifyContent: "flex-start" }} // Align text to the left
            labelStyle={{ fontSize: 18, color: "red" }}
            onPress={() => setModalVisible(true)} // Show modal on press
          >
            Delete Account
          </Button>
        </SafeAreaView>
      </ScrollView>

      {/* Delete Account Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ width: 300, padding: 20, backgroundColor: "white", borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Type "Delete" to confirm account deletion:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#474747',
                borderRadius: 5,
                padding: 10,
                fontSize: 18,
                color: 'black',
                marginBottom: 10,
              }}
              placeholder="Type 'Delete'"
              placeholderTextColor="#474747"
              value={deleteText}
              onChangeText={setDeleteText}
            />
            <Button
              mode="contained"
              style={{ borderRadius: 5, marginBottom: 10 }}
              onPress={handleDeleteAccount}
            >
              Confirm
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

      {/* OTP Verification Modal */}
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
              style={{
                borderWidth: 1,
                borderColor: '#474747',
                borderRadius: 5,
                padding: 10,
                fontSize: 18,
                color: 'black',
                marginBottom: 10,
              }}
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