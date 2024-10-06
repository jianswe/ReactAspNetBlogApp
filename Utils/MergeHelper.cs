namespace ReactAspNetBlogApp.Utils
{
    public static class MergeHelper
    {
        // existingItem is modified with the new values, while updatedItem remains unchanged.
        public static void Merge<T>(T existingItem, T updatedItem)
        {
            foreach (var prop in typeof(T).GetProperties())
            {
                var updatedValue = prop.GetValue(updatedItem);
                if (updatedValue != null)
                {
                    prop.SetValue(existingItem, updatedValue);
                }
            }
        }
    }
}

