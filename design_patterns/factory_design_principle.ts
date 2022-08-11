// Factory Design Principle implements the Open/Closed Principle: you can introduce
// new types of products into the program without breaking existing client code.
// Exercise based on this reference: https://medium.com/@fawzytatdev/factory-method-design-pattern-with-real-project-example-in-typescript-51ab9a917457

// PRODUCTS
/**
 * The Product interface declares the operations that all concrete products must
 * implement.
 */
interface MailTemplate {
  generate(): string;
}

/**
 * Concrete Products provide various implementations of the Product interface.
 */
class WelcomeMailTemplate implements MailTemplate {
  public generate(): string {
    return "Welcome aboard! Thanks for signing up!";
  }
}

class NewsLetterMailTemplate implements MailTemplate {
  public generate(): string {
    return "Please enjoy our newsletter!";
  }
}

// CREATORS
abstract class Mailer {
  /**
   * Note that the Creator may also provide some default implementation of
   * the factory method.
   */
  public abstract generateMailTemplate(): MailTemplate;

  /**
   * Also note that, despite its name, the Creator's primary responsability is
   * not creating products. Usually it contains some core business logic that
   * relies on Product objects, returned by the factory method. Subclasess can
   * indirectly change that business logic by overriding the factory method
   * and returning a different type of product from it.
   */
  public sendMail(): string {
    const mailTemplate = this.generateMailTemplate();
    return `Sending the following mail : ${mailTemplate.generate()}`;
  }
}

/**
 * Concrete Creators override the factory method in order to change the
 * resultin product´s type.
 */
class WelcomeMailGenerator extends Mailer {
  public generateMailTemplate(): MailTemplate {
    return new WelcomeMailTemplate();
  }
}

class NewsLetterMailGenerator extends Mailer {
  public generateMailTemplate(): MailTemplate {
    return new NewsLetterMailTemplate();
  }
}

/**
 * The client code works with an instance of a concrete creator, through
 * its base interface. As long as the client keeps working with the creator via
 * the base interface, you can pass it any creator's subclass.
 */
function clientCode(mailer: Mailer) {
  console.log(mailer.sendMail());
}

/**
 * The Application picks a creator´s type depending on the configuration or
 * environment.
 */
clientCode(new WelcomeMailGenerator());
console.log("---");
clientCode(new NewsLetterMailGenerator());
