import { Routes } from '@angular/router';
import { AddMediaContent } from './pages/add-media-content/add-media-content';
import { ContentSentReviewDetails } from './pages/content-sent-review-details/content-sent-review-details';
import { ContentSentReview } from './pages/content-sent-review/content-sent-review';
import { Home } from './pages/home/home';
import { ManageMediaContentDetails } from './pages/manage-media-content-details/manage-media-content-details';
import { ManageMediaContent } from './pages/manage-media-content/manage-media-content';
import { MediaCenter } from './pages/media-center/media-center';
import { NewsDetails } from './pages/news-details/news-details';
import { RoleSwitcher } from './pages/role-switcher/role-switcher';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'role-switcher', component: RoleSwitcher},
    {path: 'media-center', component: MediaCenter},
    {path: 'media-center/review', component: ContentSentReview},
    {path: 'media-center/review/:id', component: ContentSentReviewDetails},
    {path: 'media-center/manage', component: ManageMediaContent},
    {path: 'media-center/manage/add', component: AddMediaContent},
    {path: 'media-center/manage/edit/:id', component: AddMediaContent},
    {path: 'media-center/manage/:id', component: ManageMediaContentDetails},
    {path: 'media-center/:id', component: NewsDetails}
];
