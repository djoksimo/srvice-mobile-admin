//  @flow
import AsyncStorage from "@react-native-community/async-storage";

class CacheService {
  async set(key: string, data: any) {
    await AsyncStorage.setItem(key, data);
  }

  async get(key: string) {
    return await AsyncStorage.getItem(key);
  }

  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  }

  async getAuthHeader() {
    return await {
      agentId: await this.get("agentId"),
      email: await this.get("email"),
      token: await this.get("token"),
    };
  }
}

export default CacheService;
