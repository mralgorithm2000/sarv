import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface GratitudeEntry {
  text: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'gratitude_entries';
  private readonly TOKEN_KEY = 'auth_token';

  constructor() {}

  /**
   * Save a new gratitude entry
   * @param entry The gratitude entry to save
   */
  async saveEntry(entry: GratitudeEntry): Promise<void> {
    try {
      const entries = await this.getEntries();
      entries.unshift(entry); // Add new entry at the beginning
      await Preferences.set({
        key: this.STORAGE_KEY,
        value: JSON.stringify(entries)
      });
    } catch (error) {
      console.error('Error saving entry:', error);
      throw error;
    }
  }

  /**
   * Get all gratitude entries
   * @returns Array of gratitude entries sorted by date (newest first)
   */
  async getEntries(): Promise<GratitudeEntry[]> {
    try {
      const { value } = await Preferences.get({ key: this.STORAGE_KEY });
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error getting entries:', error);
      return [];
    }
  }

  /**
   * Clear all gratitude entries
   */
  async clearEntries(): Promise<void> {
    try {
      await Preferences.remove({ key: this.STORAGE_KEY });
    } catch (error) {
      console.error('Error clearing entries:', error);
      throw error;
    }
  }

  /**
   * Delete a specific entry by its date
   * @param date The date of the entry to delete
   */
  async deleteEntry(date: string): Promise<void> {
    try {
      const entries = await this.getEntries();
      const filteredEntries = entries.filter(entry => entry.date !== date);
      await Preferences.set({
        key: this.STORAGE_KEY,
        value: JSON.stringify(filteredEntries)
      });
    } catch (error) {
      console.error('Error deleting entry:', error);
      throw error;
    }
  }

  /**
   * Save authentication token
   */
  async saveToken(token: string): Promise<void> {
    try {
      await Preferences.set({ key: this.TOKEN_KEY, value: token });
    } catch (error) {
      console.error('Error saving token:', error);
      throw error;
    }
  }

  /**
   * Get authentication token
   */
  async getToken(): Promise<string | null> {
    try {
      const { value } = await Preferences.get({ key: this.TOKEN_KEY });
      return value || null;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }
}
