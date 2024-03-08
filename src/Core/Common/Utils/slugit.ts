import slugify from 'slugify';

export default class SlugIt {
  static make(name: any) {
    return slugify(name, { lower: true });
  }
}
