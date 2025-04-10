
import { nanoid } from 'nanoid';

// Type definitions
export type ShortenedURL = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: number;
  clicks: number;
};

// In-memory storage for URLs (In a real app, this would be a database)
const urlStorage: Record<string, ShortenedURL> = {};

// Base URL for shortened links
const BASE_URL = window.location.origin;

// Generate a shortened URL
export const shortenUrl = (originalUrl: string): ShortenedURL => {
  const id = nanoid(8); // Generate an 8 character unique ID
  const shortUrl = `${BASE_URL}/s/${id}`;
  const newUrl: ShortenedURL = {
    id,
    originalUrl,
    shortUrl,
    createdAt: Date.now(),
    clicks: 0,
  };
  
  // Store the URL
  urlStorage[id] = newUrl;
  saveToLocalStorage();
  
  return newUrl;
};

// Get a URL by its ID
export const getUrlById = (id: string): ShortenedURL | null => {
  return urlStorage[id] || null;
};

// Track a click on a shortened URL
export const trackClick = (id: string): ShortenedURL | null => {
  const url = urlStorage[id];
  if (url) {
    url.clicks++;
    saveToLocalStorage();
    return url;
  }
  return null;
};

// Get all URLs
export const getAllUrls = (): ShortenedURL[] => {
  return Object.values(urlStorage).sort((a, b) => b.createdAt - a.createdAt);
};

// Delete a URL
export const deleteUrl = (id: string): boolean => {
  if (urlStorage[id]) {
    delete urlStorage[id];
    saveToLocalStorage();
    return true;
  }
  return false;
};

// Save to localStorage
const saveToLocalStorage = () => {
  localStorage.setItem('shortenedUrls', JSON.stringify(urlStorage));
};

// Load from localStorage
export const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('shortenedUrls');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(urlStorage, parsed);
    } catch (error) {
      console.error('Failed to parse saved URLs', error);
    }
  }
};

// Clear all data
export const clearAllData = () => {
  Object.keys(urlStorage).forEach(key => delete urlStorage[key]);
  saveToLocalStorage();
};

// Initialize by loading from localStorage
loadFromLocalStorage();
