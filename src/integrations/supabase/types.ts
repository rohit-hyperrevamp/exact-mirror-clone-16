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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      abandoned_carts: {
        Row: {
          created_at: string
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          id: string
          items: Json
          recovered: boolean
          source: string | null
          subtotal: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          items?: Json
          recovered?: boolean
          source?: string | null
          subtotal?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          items?: Json
          recovered?: boolean
          source?: string | null
          subtotal?: number
          updated_at?: string
        }
        Relationships: []
      }
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
      customers: {
        Row: {
          city: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          notes: string | null
          phone: string
          updated_at: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          notes?: string | null
          phone: string
          updated_at?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          notes?: string | null
          phone?: string
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
      lab_tests: {
        Row: {
          category: string
          created_at: string
          department: string | null
          description: string | null
          fasting_required: boolean
          home_collection: boolean
          id: string
          image_url: string | null
          mrp: number | null
          name: string
          parameters: string[]
          prep_instructions: string | null
          price: number
          sample_type: string | null
          slug: string
          sort_order: number
          status: string
          sub: string | null
          turnaround: string | null
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          department?: string | null
          description?: string | null
          fasting_required?: boolean
          home_collection?: boolean
          id?: string
          image_url?: string | null
          mrp?: number | null
          name: string
          parameters?: string[]
          prep_instructions?: string | null
          price?: number
          sample_type?: string | null
          slug: string
          sort_order?: number
          status?: string
          sub?: string | null
          turnaround?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          department?: string | null
          description?: string | null
          fasting_required?: boolean
          home_collection?: boolean
          id?: string
          image_url?: string | null
          mrp?: number | null
          name?: string
          parameters?: string[]
          prep_instructions?: string | null
          price?: number
          sample_type?: string | null
          slug?: string
          sort_order?: number
          status?: string
          sub?: string | null
          turnaround?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      loyalty_campaigns: {
        Row: {
          active: boolean
          audience: string | null
          code: string
          created_at: string
          id: string
          kind: string
          name: string
          updated_at: string
          value: number
        }
        Insert: {
          active?: boolean
          audience?: string | null
          code: string
          created_at?: string
          id?: string
          kind?: string
          name: string
          updated_at?: string
          value?: number
        }
        Update: {
          active?: boolean
          audience?: string | null
          code?: string
          created_at?: string
          id?: string
          kind?: string
          name?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      loyalty_members: {
        Row: {
          created_at: string
          customer_id: string | null
          id: string
          lifetime_points: number
          name: string | null
          phone: string
          points_balance: number
          tier: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          id?: string
          lifetime_points?: number
          name?: string | null
          phone: string
          points_balance?: number
          tier?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          id?: string
          lifetime_points?: number
          name?: string | null
          phone?: string
          points_balance?: number
          tier?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_members_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_settings: {
        Row: {
          earn_percent: number
          expiry_days: number
          id: boolean
          max_earn_per_order: number
          max_redeem_percent: number
          min_order_amount: number
          point_to_rupee: number
          updated_at: string
        }
        Insert: {
          earn_percent?: number
          expiry_days?: number
          id?: boolean
          max_earn_per_order?: number
          max_redeem_percent?: number
          min_order_amount?: number
          point_to_rupee?: number
          updated_at?: string
        }
        Update: {
          earn_percent?: number
          expiry_days?: number
          id?: boolean
          max_earn_per_order?: number
          max_redeem_percent?: number
          min_order_amount?: number
          point_to_rupee?: number
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          customer_name: string | null
          customer_phone: string | null
          id: string
          method: string | null
          order_id: string | null
          order_no: string | null
          paid_at: string | null
          provider: string
          raw: Json
          reference: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount?: number
          created_at?: string
          currency?: string
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          method?: string | null
          order_id?: string | null
          order_no?: string | null
          paid_at?: string | null
          provider?: string
          raw?: Json
          reference?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          method?: string | null
          order_id?: string | null
          order_no?: string | null
          paid_at?: string | null
          provider?: string
          raw?: Json
          reference?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "test_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string
          description: string | null
          discount_type: string
          discount_value: number
          ends_at: string | null
          id: string
          max_redemptions: number | null
          min_order: number
          starts_at: string | null
          status: string
          times_used: number
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          discount_type?: string
          discount_value?: number
          ends_at?: string | null
          id?: string
          max_redemptions?: number | null
          min_order?: number
          starts_at?: string | null
          status?: string
          times_used?: number
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          discount_type?: string
          discount_value?: number
          ends_at?: string | null
          id?: string
          max_redemptions?: number | null
          min_order?: number
          starts_at?: string | null
          status?: string
          times_used?: number
          updated_at?: string
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
      test_order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          price: number
          qty: number
          test_id: string | null
          test_name: string
          test_slug: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          price?: number
          qty?: number
          test_id?: string | null
          test_name: string
          test_slug?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          price?: number
          qty?: number
          test_id?: string | null
          test_name?: string
          test_slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "test_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "test_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_order_items_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "lab_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      test_orders: {
        Row: {
          address: string | null
          collection_type: string
          created_at: string
          customer_email: string | null
          customer_id: string | null
          customer_name: string | null
          customer_phone: string | null
          discount: number
          id: string
          notes: string | null
          order_no: string
          paid_at: string | null
          payment_method: string
          payment_status: string
          pincode: string | null
          promo_code: string | null
          scheduled_at: string | null
          status: string
          subtotal: number
          total: number
          updated_at: string
        }
        Insert: {
          address?: string | null
          collection_type?: string
          created_at?: string
          customer_email?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          discount?: number
          id?: string
          notes?: string | null
          order_no?: string
          paid_at?: string | null
          payment_method?: string
          payment_status?: string
          pincode?: string | null
          promo_code?: string | null
          scheduled_at?: string | null
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
        }
        Update: {
          address?: string | null
          collection_type?: string
          created_at?: string
          customer_email?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          discount?: number
          id?: string
          notes?: string | null
          order_no?: string
          paid_at?: string | null
          payment_method?: string
          payment_status?: string
          pincode?: string | null
          promo_code?: string | null
          scheduled_at?: string | null
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
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
