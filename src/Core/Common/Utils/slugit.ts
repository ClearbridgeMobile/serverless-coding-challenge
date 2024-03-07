import slugify from 'slugify';

export default class SlugIt {
  static make(name) {
    return slugify(name, { lower: true });
  }
}
