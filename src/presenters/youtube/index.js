export default class YoutubePresenter {
  formatPlaylistItems(playlistItems) {
    return playlistItems.map(item => ({
      title: this.prepareTrackTitle(item.snippet.title),
    }));
  }

  removeSpecialChars(targetString) {
    return targetString.replace(/\s*\(.*?\)\s*/g, '')
      .replace(/\s*\[.*?\]\s*/g, '')
      .replace('-', '');
  }

  removeSpecialWords(targetString) {
    return targetString.replace('official', '')
      .replace('track', '')
      .replace('audio', '')
      .replace('lyric', '')
      .replace('video', '');
  }

  prepareTrackTitle(trackTitle) {
    const loweredTitle = trackTitle.toLowerCase();
    const titleCharsTrimmed = this.removeSpecialChars(loweredTitle);
    const titleWordsTrimmed = this.removeSpecialChars(titleCharsTrimmed);

    return decodeURIComponent(titleWordsTrimmed);
  }
}
