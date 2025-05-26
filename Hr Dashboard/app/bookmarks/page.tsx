import BookmarkList from '@/components/bookmarks/bookmark-list';

export default function BookmarksPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
        <p className="text-muted-foreground mt-1">
          Manage your saved employees and quick actions
        </p>
      </div>
      
      <BookmarkList />
    </div>
  );
}