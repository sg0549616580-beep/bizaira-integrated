export const supabase = {
  auth: {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      return {
        data: {
          user: { id: "demo-user", email, user_metadata: { full_name: "Bizaira Guest" } },
        },
        error: null,
      };
    },
    signUp: async ({ email, password }: { email: string; password: string }) => {
      return {
        data: {
          user: { id: "demo-user", email, user_metadata: { full_name: "Bizaira Guest" } },
        },
        error: null,
      };
    },
  },
};
