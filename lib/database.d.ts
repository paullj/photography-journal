export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string | null;
          username: string;
          loggedin: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          username?: string;
          loggedin?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          username?: string;
          loggedin?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          author_id: string;
          deleted_at: string | null;
          id: string;
          upload_status: Database["public"]["Enums"]["uploadstatus"];
          title: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          author_id: string;
          deleted_at?: string | null;
          id?: string;
          upload_status?: Database["public"]["Enums"]["uploadstatus"];
          title?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string;
          deleted_at?: string | null;
          id?: string;
          upload_status?: Database["public"]["Enums"]["uploadstatus"];
          title?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      images: {
        Row: {
          owner_id: string;
          post_id: string;
          width: number;
          height: number;
          post_order: number | null;
          iso_number: number | null;
          f_stop: number | null;
          exposure_time: number | null;
          image_url: string;
          deleted_at: string | null;
          id: string;
          caption: string | null;
          alt_text: string | null;
          camera_model: string | null;
          lens_model: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          owner_id: string;
          post_id: string;
          width: number;
          height: number;
          post_order?: number | null;
          iso_number?: number | null;
          f_stop?: number | null;
          exposure_time?: number | null;
          image_url: string;
          deleted_at?: string | null;
          id?: string;
          caption?: string | null;
          alt_text?: string | null;
          camera_model?: string | null;
          lens_model?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          owner_id?: string;
          post_id?: string;
          width?: number;
          height?: number;
          post_order?: number | null;
          iso_number?: number | null;
          f_stop?: number | null;
          exposure_time?: number | null;
          image_url?: string;
          deleted_at?: string | null;
          id?: string;
          caption?: string | null;
          alt_text?: string | null;
          camera_model?: string | null;
          lens_model?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      uploadstatus: "uploading" | "error" | "done";
    };
  };
}

