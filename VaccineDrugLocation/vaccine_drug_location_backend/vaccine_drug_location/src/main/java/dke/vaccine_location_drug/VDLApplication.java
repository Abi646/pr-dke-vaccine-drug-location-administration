package dke.vaccine_location_drug;

import dke.vaccine_location_drug.entity.Article;
import dke.vaccine_location_drug.entity.Line;
import dke.vaccine_location_drug.entity.Location;
import dke.vaccine_location_drug.repository.ArticleRepository;
import dke.vaccine_location_drug.repository.LineRepository;
import dke.vaccine_location_drug.repository.LocationRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class VDLApplication {
	private final ArticleRepository articleRepository;
	private final LocationRepository locationRepository;
	private final LineRepository lineRepository;

	public VDLApplication(ArticleRepository articleRepository, LocationRepository locationRepository, LineRepository lineRepository) {
		this.articleRepository = articleRepository;
		this.locationRepository = locationRepository;
		this.lineRepository = lineRepository;
	}

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(VDLApplication.class, args);
		VDLApplication application = context.getBean(VDLApplication.class);
		application.createData();
	}

	public void createData() {
		if (articleRepository.count() == 0 && lineRepository.count() == 0 && locationRepository.count() == 0) {
			// Erzeuge neue Artikel
			Article article1 = new Article();
			article1.setName("Comirnaty-(BioNTech/Pfizer)");
			article1.setType("vaccine");
			article1.setMinAge(2);
			article1.setMaxAge(60);
			article1.setStock(200);
			articleRepository.save(article1);

			Article article2 = new Article();
			article2.setName("Spikevax-(Moderna)");
			article2.setType("vaccine");
			article2.setMinAge(2);
			article2.setMaxAge(100);
			article2.setStock(100);
			articleRepository.save(article2);

			Article article3 = new Article();
			article3.setName("Vaxzevria-(AstraZeneca)");
			article3.setType("vaccine");
			article3.setMinAge(1);
			article3.setMaxAge(99);
			article3.setStock(75);
			articleRepository.save(article3);

			Article article4 = new Article();
			article4.setName("Janssen-(Johnson&Johnson)");
			article4.setType("vaccine");
			article4.setMinAge(16);
			article4.setMaxAge(99);
			article4.setStock(80);
			articleRepository.save(article4);

			Article article5 = new Article();
			article5.setName("Remdesivir");
			article5.setType("drug");
			article5.setMinAge(1);
			article5.setMaxAge(50);
			article5.setStock(90);
			articleRepository.save(article5);

			Article article6 = new Article();
			article6.setName("Molnupiravir");
			article6.setType("drug");
			article6.setMinAge(1);
			article6.setMaxAge(50);
			article6.setStock(100);
			articleRepository.save(article6);

			Article article7 = new Article();
			article7.setName("Dexamethason");
			article7.setType("drug");
			article7.setMinAge(2);
			article7.setMaxAge(75);
			article7.setStock(140);
			articleRepository.save(article7);

			// Erzeuge Standorte mit je 2 Linien
			Location location1 = new Location();
			location1.setName("Wels-Landhof");
			location1.setCounty("Wels-Land");
			location1.setAddress("Welserlandstrasse 32");
			location1.setType("vaccination");
			location1.setDuration(10);
			locationRepository.save(location1);

			Location location2 = new Location();
			location2.setName("Rathaus-Marchtrenk");
			location2.setCounty("Wels-Land");
			location2.setAddress("Marchtrenkerstrasse 45");
			location2.setType("medication");
			location2.setDuration(10);
			locationRepository.save(location2);

			Line line1 = new Line();
			line1.setLineNumber(1);
			line1.setType("vaccine");
			line1.setArticle(article1);
			line1.setQuantity(10);
			line1.setLocation(location1);
			lineRepository.save(line1);

			Line line2 = new Line();
			line2.setLineNumber(2);
			line2.setType("vaccine");
			line2.setArticle(article2);
			line2.setQuantity(15);
			line2.setLocation(location1);
			lineRepository.save(line2);

			Line line3 = new Line();
			line3.setLineNumber(3);
			line3.setType("drug");
			line3.setArticle(article5);
			line3.setQuantity(20);
			line3.setLocation(location2);
			lineRepository.save(line3);

			Line line4 = new Line();
			line4.setLineNumber(4);
			line4.setType("drug");
			line4.setArticle(article6);
			line4.setQuantity(15);
			line4.setLocation(location2);
			lineRepository.save(line4);

			Location location3 = new Location();
			location3.setName("Linzer-Markt");
			location3.setCounty("Linz-Land");
			location3.setAddress("Marktstrasse 20");
			location3.setType("vaccination");
			location3.setDuration(10);
			locationRepository.save(location3);

			Location location4 = new Location();
			location4.setName("Rathaus-Linz");
			location4.setCounty("Linz-Land");
			location4.setAddress("Linzerstrasse 12");
			location4.setType("medication");
			location4.setDuration(10);
			locationRepository.save(location4);

			Line line5 = new Line();
			line5.setLineNumber(5);
			line5.setType("vaccine");
			line5.setArticle(article3);
			line5.setQuantity(10);
			line5.setLocation(location3);
			lineRepository.save(line5);

			Line line6 = new Line();
			line6.setLineNumber(6);
			line6.setType("vaccine");
			line6.setArticle(article4);
			line6.setQuantity(9);
			line6.setLocation(location3);
			lineRepository.save(line6);

			Line line7 = new Line();
			line7.setLineNumber(7);
			line7.setType("drug");
			line7.setArticle(article5);
			line7.setQuantity(5);
			line7.setLocation(location4);
			lineRepository.save(line7);

			Line line8 = new Line();
			line8.setLineNumber(8);
			line8.setType("drug");
			line8.setArticle(article7);
			line8.setQuantity(17);
			line8.setLocation(location4);
			lineRepository.save(line8);

			Location location5 = new Location();
			location5.setName("Hauptplatz");
			location5.setCounty("Gmunden");
			location5.setAddress("Hauptweg 32");
			location5.setType("vaccination");
			location5.setDuration(10);
			locationRepository.save(location5);

			Location location6 = new Location();
			location6.setName("Messe-Gmunden");
			location6.setCounty("Gmunden");
			location6.setAddress("Messestrasse 1");
			location6.setType("medication");
			location6.setDuration(10);
			locationRepository.save(location6);

			Line line9 = new Line();
			line9.setLineNumber(9);
			line9.setType("vaccine");
			line9.setArticle(article1);
			line9.setQuantity(65);
			line9.setLocation(location5);
			lineRepository.save(line9);

			Line line10 = new Line();
			line10.setLineNumber(10);
			line10.setType("vaccine");
			line10.setArticle(article2);
			line10.setQuantity(50);
			line10.setLocation(location5);
			lineRepository.save(line10);

			Line line11 = new Line();
			line11.setLineNumber(11);
			line11.setType("drug");
			line11.setArticle(article5);
			line11.setQuantity(35);
			line11.setLocation(location6);
			lineRepository.save(line11);

			Line line12 = new Line();
			line12.setLineNumber(12);
			line12.setType("drug");
			line12.setArticle(article7);
			line12.setQuantity(30);
			line12.setLocation(location6);
			lineRepository.save(line12);

			System.out.println("Data created successfully.");
		}
	}
}
