export const uiStore = {
    isNavOpen: false,
    isFooterVisible: true,
    
    toggleNav() {
        this.isNavOpen = !this.isNavOpen;
    },
    
    showFooter() {
        this.isFooterVisible = true;
    },
    
    hideFooter() {
        this.isFooterVisible = false;
    }
};