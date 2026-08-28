export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          h1: string | null
          id: string
          last_error: string | null
          meta_description: string | null
          meta_title: string | null
          needs_review: boolean
          primary_keyword: string | null
          published_at: string | null
          read_minutes: number
          scheduled_date: string | null
          scheduled_time: string
          secondary_keywords: string[]
          slug: string
          source: string
          status: string
          tags: string[]
          timezone: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          h1?: string | null
          id?: string
          last_error?: string | null
          meta_description?: string | null
          meta_title?: string | null
          needs_review?: boolean
          primary_keyword?: string | null
          published_at?: string | null
          read_minutes?: number
          scheduled_date?: string | null
          scheduled_time?: string
          secondary_keywords?: string[]
          slug: string
          source?: string
          status?: string
          tags?: string[]
          timezone?: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          h1?: string | null
          id?: string
          last_error?: string | null
          meta_description?: string | null
          meta_title?: string | null
          needs_review?: boolean
          primary_keyword?: string | null
          published_at?: string | null
          read_minutes?: number
          scheduled_date?: string | null
          scheduled_time?: string
          secondary_keywords?: string[]
          slug?: string
          source?: string
          status?: string
          tags?: string[]
          timezone?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_publish_log: {
        Row: {
          action: string
          created_at: string
          id: string
          message: string | null
          ok: boolean
          post_id: string | null
          slug: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          message?: string | null
          ok?: boolean
          post_id?: string | null
          slug?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          message?: string | null
          ok?: boolean
          post_id?: string | null
          slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_publish_log_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_settings: {
        Row: {
          auto_publish_enabled: boolean
          default_publish_time: string
          id: boolean
          overdue_grace_days: number
          timezone: string
          updated_at: string
        }
        Insert: {
          auto_publish_enabled?: boolean
          default_publish_time?: string
          id?: boolean
          overdue_grace_days?: number
          timezone?: string
          updated_at?: string
        }
        Update: {
          auto_publish_enabled?: boolean
          default_publish_time?: string
          id?: boolean
          overdue_grace_days?: number
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          created_at: string
          dob: string | null
          email: string
          email_delivery_error: string | null
          email_delivery_status: string
          form_type: string
          id: string
          message: string | null
          name: string | null
          payload: Json
          phone: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          dob?: string | null
          email: string
          email_delivery_error?: string | null
          email_delivery_status?: string
          form_type: string
          id?: string
          message?: string | null
          name?: string | null
          payload?: Json
          phone?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          dob?: string | null
          email?: string
          email_delivery_error?: string | null
          email_delivery_status?: string
          form_type?: string
          id?: string
          message?: string | null
          name?: string | null
          payload?: Json
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      seo_admins: {
        Row: {
          created_at: string
          id: string
          login_id: string
          password_hash: string
        }
        Insert: {
          created_at?: string
          id?: string
          login_id: string
          password_hash: string
        }
        Update: {
          created_at?: string
          id?: string
          login_id?: string
          password_hash?: string
        }
        Relationships: []
      }
      seo_blog_posts: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          body_md: string
          client_notes: string | null
          created_at: string
          deployed_at: string | null
          id: string
          internal_notes: string | null
          meta_description: string | null
          primary_keyword: string | null
          read_minutes: number | null
          scheduled_date: string | null
          secondary_keywords: string[] | null
          slug: string
          status: string
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          body_md?: string
          client_notes?: string | null
          created_at?: string
          deployed_at?: string | null
          id?: string
          internal_notes?: string | null
          meta_description?: string | null
          primary_keyword?: string | null
          read_minutes?: number | null
          scheduled_date?: string | null
          secondary_keywords?: string[] | null
          slug: string
          status?: string
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          body_md?: string
          client_notes?: string | null
          created_at?: string
          deployed_at?: string | null
          id?: string
          internal_notes?: string | null
          meta_description?: string | null
          primary_keyword?: string | null
          read_minutes?: number | null
          scheduled_date?: string | null
          secondary_keywords?: string[] | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      seo_indexing_log: {
        Row: {
          action: string
          error: string | null
          http_status: number | null
          id: string
          pinged_at: string
          source: string | null
          status: string
          url: string
        }
        Insert: {
          action?: string
          error?: string | null
          http_status?: number | null
          id?: string
          pinged_at?: string
          source?: string | null
          status?: string
          url: string
        }
        Update: {
          action?: string
          error?: string | null
          http_status?: number | null
          id?: string
          pinged_at?: string
          source?: string | null
          status?: string
          url?: string
        }
        Relationships: []
      }
      seo_integrations: {
        Row: {
          access_token: string | null
          connected_at: string
          connected_by_user_id: string | null
          id: string
          last_error: string | null
          last_refreshed_at: string | null
          property_url: string | null
          provider: string
          refresh_token: string
          scope: string | null
          token_expires_at: string | null
        }
        Insert: {
          access_token?: string | null
          connected_at?: string
          connected_by_user_id?: string | null
          id?: string
          last_error?: string | null
          last_refreshed_at?: string | null
          property_url?: string | null
          provider: string
          refresh_token: string
          scope?: string | null
          token_expires_at?: string | null
        }
        Update: {
          access_token?: string | null
          connected_at?: string
          connected_by_user_id?: string | null
          id?: string
          last_error?: string | null
          last_refreshed_at?: string | null
          property_url?: string | null
          provider?: string
          refresh_token?: string
          scope?: string | null
          token_expires_at?: string | null
        }
        Relationships: []
      }
      seo_settings: {
        Row: {
          auto_execute: boolean
          blog_approval_required: boolean
          id: number
          last_auto_run_at: string | null
          updated_at: string
        }
        Insert: {
          auto_execute?: boolean
          blog_approval_required?: boolean
          id?: number
          last_auto_run_at?: string | null
          updated_at?: string
        }
        Update: {
          auto_execute?: boolean
          blog_approval_required?: boolean
          id?: number
          last_auto_run_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      seo_tasks: {
        Row: {
          blog_slug: string | null
          category: string
          completed_at: string | null
          completed_by: string | null
          content_brief: string | null
          created_at: string
          deliverable_type: string | null
          description: string | null
          effort_minutes: number
          id: string
          meta_description: string | null
          notes: string | null
          page_title: string | null
          priority: string
          scheduled_date: string | null
          secondary_keywords: string[] | null
          section: string
          sort_order: number
          status: string
          target_keyword: string | null
          target_url: string | null
          title: string
          updated_at: string
          verified_at: string | null
          verified_snapshot: Json | null
          verified_status: string | null
          week: number | null
        }
        Insert: {
          blog_slug?: string | null
          category?: string
          completed_at?: string | null
          completed_by?: string | null
          content_brief?: string | null
          created_at?: string
          deliverable_type?: string | null
          description?: string | null
          effort_minutes?: number
          id?: string
          meta_description?: string | null
          notes?: string | null
          page_title?: string | null
          priority?: string
          scheduled_date?: string | null
          secondary_keywords?: string[] | null
          section?: string
          sort_order?: number
          status?: string
          target_keyword?: string | null
          target_url?: string | null
          title: string
          updated_at?: string
          verified_at?: string | null
          verified_snapshot?: Json | null
          verified_status?: string | null
          week?: number | null
        }
        Update: {
          blog_slug?: string | null
          category?: string
          completed_at?: string | null
          completed_by?: string | null
          content_brief?: string | null
          created_at?: string
          deliverable_type?: string | null
          description?: string | null
          effort_minutes?: number
          id?: string
          meta_description?: string | null
          notes?: string | null
          page_title?: string | null
          priority?: string
          scheduled_date?: string | null
          secondary_keywords?: string[] | null
          section?: string
          sort_order?: number
          status?: string
          target_keyword?: string | null
          target_url?: string | null
          title?: string
          updated_at?: string
          verified_at?: string | null
          verified_snapshot?: Json | null
          verified_status?: string | null
          week?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      blog_scheduled_at: {
        Args: { p_date: string; p_time: string; p_tz: string }
        Returns: string
      }
      publish_due_blog_posts: {
        Args: never
        Returns: {
          flagged_count: number
          published_count: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
