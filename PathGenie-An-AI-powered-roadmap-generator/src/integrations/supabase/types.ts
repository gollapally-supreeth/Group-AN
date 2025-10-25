export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_usage_tracking: {
        Row: {
          api_type: string
          created_at: string | null
          date: string | null
          endpoint: string
          id: string
          request_count: number | null
          user_id: string | null
        }
        Insert: {
          api_type: string
          created_at?: string | null
          date?: string | null
          endpoint: string
          id?: string
          request_count?: number | null
          user_id?: string | null
        }
        Update: {
          api_type?: string
          created_at?: string | null
          date?: string | null
          endpoint?: string
          id?: string
          request_count?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      learning_resources: {
        Row: {
          created_at: string
          description: string | null
          difficulty_level: string | null
          estimated_time_minutes: number | null
          id: string
          is_official: boolean | null
          metadata: Json | null
          quality_score: number | null
          resource_type: string
          roadmap_id: string | null
          skill_name: string
          source: string
          tags: string[] | null
          task_id: string
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          estimated_time_minutes?: number | null
          id?: string
          is_official?: boolean | null
          metadata?: Json | null
          quality_score?: number | null
          resource_type: string
          roadmap_id?: string | null
          skill_name: string
          source: string
          tags?: string[] | null
          task_id: string
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          estimated_time_minutes?: number | null
          id?: string
          is_official?: boolean | null
          metadata?: Json | null
          quality_score?: number | null
          resource_type?: string
          roadmap_id?: string | null
          skill_name?: string
          source?: string
          tags?: string[] | null
          task_id?: string
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_resources_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmaps"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      roadmap_cache: {
        Row: {
          access_count: number | null
          cache_key: string
          cached_data: Json
          created_at: string | null
          id: string
          level: string
          skill_name: string
          time_commitment: string
          updated_at: string | null
        }
        Insert: {
          access_count?: number | null
          cache_key: string
          cached_data: Json
          created_at?: string | null
          id?: string
          level: string
          skill_name: string
          time_commitment: string
          updated_at?: string | null
        }
        Update: {
          access_count?: number | null
          cache_key?: string
          cached_data?: Json
          created_at?: string | null
          id?: string
          level?: string
          skill_name?: string
          time_commitment?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      roadmaps: {
        Row: {
          created_at: string
          current_level: string
          end_goal: string | null
          generated_data: Json
          id: string
          is_public: boolean | null
          learning_style: string | null
          shared_at: string | null
          skill_name: string
          time_commitment: string
          timeline: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_level: string
          end_goal?: string | null
          generated_data: Json
          id?: string
          is_public?: boolean | null
          learning_style?: string | null
          shared_at?: string | null
          skill_name: string
          time_commitment: string
          timeline?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_level?: string
          end_goal?: string | null
          generated_data?: Json
          id?: string
          is_public?: boolean | null
          learning_style?: string | null
          shared_at?: string | null
          skill_name?: string
          time_commitment?: string
          timeline?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          razorpay_customer_id: string | null
          razorpay_plan_id: string | null
          razorpay_subscription_id: string | null
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          razorpay_customer_id?: string | null
          razorpay_plan_id?: string | null
          razorpay_subscription_id?: string | null
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          razorpay_customer_id?: string | null
          razorpay_plan_id?: string | null
          razorpay_subscription_id?: string | null
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_learning_preferences: {
        Row: {
          difficulty_preference: string | null
          id: string
          learning_style: string | null
          preferred_formats: string[] | null
          time_preference: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          difficulty_preference?: string | null
          id?: string
          learning_style?: string | null
          preferred_formats?: string[] | null
          time_preference?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          difficulty_preference?: string | null
          id?: string
          learning_style?: string | null
          preferred_formats?: string[] | null
          time_preference?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_resource_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          notes: string | null
          rating: number | null
          resource_id: string
          roadmap_id: string
          started_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          rating?: number | null
          resource_id: string
          roadmap_id: string
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          rating?: number | null
          resource_id?: string
          roadmap_id?: string
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_resource_progress_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "learning_resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_resource_progress_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmaps"
            referencedColumns: ["id"]
          },
        ]
      }
      youtube_cache: {
        Row: {
          access_count: number | null
          created_at: string | null
          id: string
          search_query: string
          skill_name: string
          video_data: Json
        }
        Insert: {
          access_count?: number | null
          created_at?: string | null
          id?: string
          search_query: string
          skill_name: string
          video_data: Json
        }
        Update: {
          access_count?: number | null
          created_at?: string | null
          id?: string
          search_query?: string
          skill_name?: string
          video_data?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
