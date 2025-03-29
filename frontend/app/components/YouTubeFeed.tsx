import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from 'axios';
import { decode } from 'html-entities';
import { COLORS } from '../../constants/Colors';

type YouTubeVideo = {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    liveBroadcastContent?: 'live' | 'none';
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
};

type YouTubeFeedState = {
  content: YouTubeVideo | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
};

const YouTubeFeed = () => {
  const [state, setState] = useState<YouTubeFeedState>({
    content: null,
    loading: true,
    error: null,
    lastUpdated: null
  });

  const YOUTUBE_API_KEY = 'AIzaSyCK2p5gGr8rgVcK5Jd5sKtn0dWiBTFW-9I';
  // ID complet de la chaîne
  const CHANNEL_ID = 'UC3x1ZgvKa1hVWXYVm9_pc6g';
  
  // Vidéo par défaut en cas d'erreur API
  const defaultVideo: YouTubeVideo = {
    id: { videoId: "6uKfqsNuMEk" },
    snippet: {
      title: "CULTE DE LOUANGE ET D'ADORATION DU 23/03/2025",
      channelTitle: "Eglise Évangélique des Assemblées de DIEU (Riviera2)",
      publishedAt: "2025-03-23T00:00:00Z",
      liveBroadcastContent: "none",
      thumbnails: {
        high: {
          url: "https://img.youtube.com/vi/6uKfqsNuMEk/hqdefault.jpg"
        }
      }
    }
  };

  const fetchContent = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Récupération des contenus (vidéo en direct et dernière vidéo)
      const [liveRes, videoRes] = await Promise.all([
        axios.get<{ items: YouTubeVideo[] }>(
          'https://www.googleapis.com/youtube/v3/search',
          {
            params: {
              key: YOUTUBE_API_KEY,
              channelId: CHANNEL_ID,
              part: 'snippet',
              eventType: 'live',
              type: 'video',
              maxResults: 1
            }
          }
        ),
        axios.get<{ items: YouTubeVideo[] }>(
          'https://www.googleapis.com/youtube/v3/search',
          {
            params: {
              key: YOUTUBE_API_KEY,
              channelId: CHANNEL_ID,
              part: 'snippet',
              order: 'date',
              maxResults: 1,
              type: 'video'
            }
          }
        )
      ]);

      const live = liveRes.data.items?.[0];
      const latestVideo = videoRes.data.items?.[0];

      if (!live && !latestVideo) {
        throw new Error('Aucun contenu vidéo disponible');
      }

      setState({
        content: live || latestVideo,
        loading: false,
        error: null,
        lastUpdated: new Date()
      });
    } catch (error: any) {
      console.error('Erreur API:', {
        message: error.message,
        response: error.response?.data
      });

      // En cas d'erreur (quota dépassé, etc.), on affiche la vidéo par défaut
      setState({
        content: defaultVideo,
        loading: false,
        error: null,
        lastUpdated: new Date()
      });
    }
  };

  useEffect(() => {
    fetchContent();
    const interval = setInterval(fetchContent, 14400000); // 4h
    return () => clearInterval(interval);
  }, []);

  if (state.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Chargement en cours...</Text>
      </View>
    );
  }

  // On ne passe plus par le container d'erreur puisque defaultVideo est affichée en cas d'erreur

  return (
    <View style={styles.container}>
      <RefreshControl
        refreshing={state.loading}
        onRefresh={fetchContent}
        colors={[COLORS.primary]}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {state.content?.snippet.liveBroadcastContent === 'live' 
            ? '🔴 Culte en direct' 
            : ''}
        </Text>

        <View style={styles.videoContainer}>
          {state.content?.snippet.liveBroadcastContent === 'live' && (
            <View style={styles.liveBadge}>
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          )}
          <YoutubePlayer
            height={220}
            videoId={state.content!.id.videoId}
            play={state.content?.snippet.liveBroadcastContent === 'live'}
            webViewProps={{
              androidLayerType: 'hardware'
            }}
          />
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle} numberOfLines={2}>
              {decode(state.content!.snippet.title)}
            </Text>
            <Text style={styles.videoMeta}>
              {new Date(state.content!.snippet.publishedAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </Text>
          </View>
        </View>
      </View>
      {/* Optionnel : affichage de l'heure de dernière mise à jour */}
      {/* {state.lastUpdated && (
        <Text style={styles.updateText}>
          Actualisé à {state.lastUpdated.toLocaleTimeString('fr-FR')}
        </Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
    marginTop: -15
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.primary,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: COLORS.youtubeRed,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 12,
  },
  videoContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  videoInfo: {
    padding: 20,
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.black,
    marginBottom: 2,
    lineHeight: 26,
    marginTop: -20
  },
  videoMeta: {
    fontSize: 12,
    color: COLORS.darkGray,
    marginTop: 4,
  },
  liveBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.youtubeRed,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  liveText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20
  },
  retryText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  updateText: {
    fontSize: 12,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default YouTubeFeed;
