import {State} from '@/types/common';
import {ContactDto} from '@/types/dto/ContactDto';
import {FavoriteContactsDto} from '@/types/dto/FavoriteContactsDto';
import {GroupContactsDto} from '@/types/dto/GroupContactsDto';

export interface CommonPageProps {
  contactsState: State<ContactDto[]>,
  favoriteContactsState: State<FavoriteContactsDto>
  groupContactsState: State<GroupContactsDto[]>
}

