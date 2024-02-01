import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';


@Injectable()
export class ServerService {
  constructor(
    private jwtService: JwtService,
  ) {
  }

  async getAccessToken(): Promise<string> {
    try {
      const auth0Options = {
        method: 'POST',
        url: 'https://dev-2r8k0b3r72uke6k5.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        data: {
          client_id: 'lnCClDsv2tW4Du5rhdubCpoqSVjkGndv',
          client_secret: 'ftfuog657xlvSqJplQ5FjOxyGAJHpIVHoS_3gTqqVVi7q76BKDhrGzsXOseT8El6',
          audience: 'https://dev-2r8k0b3r72uke6k5.us.auth0.com/api/v2/',
          grant_type: 'client_credentials',
        },
      };

      // Make the request to Auth0 token endpoint
      const response = await axios(auth0Options).json().response;
      response.data.access_token = 'Bearer ' + response.data.access_token;

      console.log(response.data.access_token);

      // Extract and return the access token from the response
      return response.data.access_token;
    } catch (error) {
      console.error('Failed to get access token', error);
      throw new Error('Failed to get access token');
    }
  }

  async getBearerToken(): Promise<string> {
    try {
      // Get the access token using the getAccessToken method
      const accessToken = await this.getAccessToken();

      // Optionally, you can decode and verify the access token using jwtService
      const decodedToken = this.jwtService.verify(accessToken);
      console.log(decodedToken);

      // Return the access token
      return accessToken;
    } catch (error) {
      console.error('Failed to get bearer token', error);
      throw new Error('Failed to get bearer token');
    }
  }


  // Your existing fetchData method remains unchanged
  async fetchData(): Promise<any> {
    try {
      // Get the bearer token using the getBearerToken method
      const bearerToken = await this.getBearerToken();

      // Make an HTTP request using Axios and the bearer token in the Authorization header
      const response = await axios.get('http://localhost:3000/', {
        headers: { Authorization: `Bearer ${bearerToken}` },
      });

      // Return the data from the HTTP response
      return response.data;
    } catch (error) {
      console.error('Failed to fetch data', error);
      throw new Error('Failed to fetch data');
    }
  }
}
