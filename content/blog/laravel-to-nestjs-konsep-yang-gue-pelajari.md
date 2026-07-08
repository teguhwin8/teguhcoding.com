---
title: "Laravel to NestJS: Konsep yang Gue Pelajari Sepanjang Jalan"
source_url: "https://medium.com/@devajayantha/laravel-to-nestjs-concepts-i-learned-along-the-way-498f39dbc70c"
tags: ["laravel", "nestjs", "backend", "typescript"]
date: "2026-07-08T08:32:00.000Z"
cover_image: "/blog-covers/laravel-to-nestjs.png"
---

Ini artikel pertama gue di 2026. Gue udah cukup lama hiatus dari nulis, dan sekarang gue siap balik lagi. Artikel ini nggak terlalu teknis. Gue mau mulai dengan sesuatu yang lebih general sambil gue ease my way back in. Semua yang gue tulis di sini datang dari pengalaman gue sendiri sebagai software engineer.

**Laravel** mungkin udah nggak asing lagi buat backend developers. Sebagai backend developer, gue udah pake Laravel untuk sebagian besar client projects gue. Laravel itu bagus — cepat, semua udah disediain, dan ecosystem-nya mature. Tapi gue pengen expand knowledge gue di backend development dengan explore frameworks lain. Salah satunya adalah **NestJS**, yang jadi topik artikel ini.

Alasan gue simple: **TypeScript dan explicit structure**. Salah satu project yang cukup complex yang lagi gue kerjain kebetulan pake NestJS dengan strict typing, banyak service integrations, dan modular architecture yang bikin codebase lebih mudah di-maintain dan scale. Real experience itulah yang shape artikel ini. Gue trying to expand, not switch.

Kalau lo Laravel developer yang curious tentang NestJS atau looking to dive deeper, artikel ini mungkin bisa kasih lo step forward. Ini bukan tutorial from scratch. Ini translation, mapping concepts yang udah lo kenal di Laravel ke equivalents-nya di NestJS. Let's get into it.

---

## 1. Project Structure

Project structure adalah hal pertama yang kita lihat ketika baca dokumentasi atau explore codebase baru.

### Laravel: Convention over Configuration

**Laravel** adalah PHP framework yang follow MVC (Model-View-Controller) pattern. Philosophy-nya adalah **"Convention over Configuration"** — meaning Laravel punya set of rules sendiri yang baked in, jadi lo nggak perlu mikir tentang structure. Lo cuma fokus bikin files pake Artisan CLI, dan everything else is handled automatically behind the scenes.

Ini bikin Laravel great untuk developers yang mau deliver fast.

### NestJS: Explicit over Implicit

**NestJS**, on the other hand, adalah Node.js framework yang dibangun dengan TypeScript dan inspired by Angular. Philosophy-nya adalah complete opposite — **"Explicit over Implicit."**

Everything must be declared, everything must be registered, dan everything must have clear origin. NestJS dibangun dengan **Modular architecture**, dimana each feature punya module sendiri. Dan don't forget — every module must be registered sebelum bisa dipake, karena lo configure everything manually.

### Perbandingan Structure

```
Laravel                          NestJS
app/                            src/
├── Http/                       ├── modules/
│   ├── Controllers/            │   ├── users/
│   ├── Middleware/             │   │   ├── users.module.ts
│   └── Requests/               │   │   ├── users.controller.ts
├── Models/                     │   │   └── users.service.ts
└── Providers/                  ├── common/
config/                         config/
routes/                         main.ts
```

Lo bisa clearly see the difference. Laravel follow MVC concept dimana lo just create files di respective folders dan everything is configured automatically behind the scenes.

NestJS, dengan modular concept-nya, let you create multiple modules, tapi lo must configure each one manually sebelum bisa dipake.

### NestJS Module Registration

```typescript
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    AppConfigModule,
    DBConfigModule,
    AuthConfigModule,
    CacheConfigModule,
    QueueConfigModule,
    CommonModule,
    AppModule,
    CmsModule,
    WebhooksModule,
  ],
  controllers: [MainController],
})
export class MainModule {}
```

Ini contoh structure dari project gue sendiri. As you can see, there are quite a few modules. Di NestJS, lo bisa create as many modules as needed, dan each module typically contains service, controller, repository, dan more.

**Every file inside a module must be registered in its own module file.** Then, that module must be registered in master module which is `main.module.ts`. That's what makes NestJS different — you configure everything yourself.

---

## 2. Routing

Sebagai backend developer, ketika kita come across URL dan want to understand logic behind it, hal pertama yang usually kita lakukan adalah look at route definition. Every framework punya cara sendiri untuk define routes untuk URL.

### Laravel: Separate Route Files

```php
// routes/api.php
Route::get('/users', [UserController::class, 'index']);
```

Di Laravel, routes defined di separate folder. As a developer, lo simply add URL endpoint lo ke route file. Example di atas shows simple implementation of adding route.

### NestJS: Decorator-Based Routing

```typescript
@Controller({ version: '1', path: ['organizations'] }) 
// ← prefix route: /v1/organizations
export class CmsOrganizationController {
  
  @Get() // GET /organizations
  findAll() {}
}
```

Di NestJS, concept-nya different. Lo will often work dengan **decorator-based routing**. Lo simply define route name directly inside controller file. Image di atas shows example of defining routes within controller, all in one place.

### Retrieving Request Data

Besides different way of defining routes, this also affects gimana kita retrieve data from request.

**Di NestJS, each part of request is explicitly declared as method parameter using decorators.**

**Di Laravel, everything is accessed through single `$request` object.**

#### Laravel Example

```php
// Laravel
public function store(Request $request) {
  $name = $request->input('name');
  $id = $request->route('id');
  $search = $request->query('search');
}
```

#### NestJS Example

```typescript
// NestJS
@Post()
@HttpCode(HttpStatus.CREATED)
@SerializeResponse()
async create(
  @Body() body: CreateOrganizationRequest
): Promise<CreateOrganizationViewModel> {
  return this.service.create(body);
}

@Get()
@HttpCode(HttpStatus.OK)
@SerializeResponse('pagination')
async paginate(
  @Query() query: PaginationRequest,
  @Query('search') search?: string,
): Promise<PaginatedResponse<OrganizationViewModel>> {
  return this.service.paginate(query, search);
}
```

---

## 3. Middleware

**Middleware** adalah layer of code yang runs sebelum request reaches Controller. Think of Middleware sebagai gate antara client request dan application logic lo. Job-nya adalah handle incoming requests sebelum they are processed — tasks kayak checking, logging, atau modifying data.

### Laravel Middleware

Di Laravel, we can create custom middleware file. Ada dua cara untuk use it — register it di configuration atau call class directly on route. Untuk simple example ini, kita akan register directly on route.

```php
class LogRequest {
  public function handle(Request $request, Closure $next) {
    Log::info($request->method() . ' ' . $request->url());
    return $next($request);
  }
}

Route::get('/users', [UserController::class, 'index'])
  ->middleware(LogRequest::class);
```

### NestJS Middleware

Di NestJS, we can register middleware globally atau specifically within module. Example below shows simple implementation of middleware in module.

Lo bisa create middleware file based on needs lo, dan to use it on endpoint, simply register it di module dimana endpoint itu belongs. Lo bisa apply it to specific routes atau to all routes within that module.

```typescript
// logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.url}`);
    next();
  }
}

// app.module.ts
@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // apply all controllers on this module
  }
}
```

### Key Differences

**Difference** antara two frameworks adalah:
- **Laravel**: Lo simply open route file dan register middleware
- **NestJS**: Lo need to open each module dimana lo want to register it

Ini reflects NestJS's approach of separating each responsibility to its own place.

Beyond that, ada juga difference in scope:
- **Laravel**: Middleware can handle almost anything — auth, validation, logging
- **NestJS**: Middleware bisa do same things, tapi NestJS provides more specific building blocks untuk each responsibility:
  - **Guards** for auth
  - **Pipes** for validation
  
As a result, middleware di NestJS lebih commonly used untuk things kayak logging, CORS, dan rate limiting.

---

## 4. Dependency Injection (DI) & Service

**Dependency Injection (DI)** adalah cara untuk sebuah class mendapatkan dependencies yang dibutuhkan tanpa create them sendiri. Instead of class A creating instance of class B inside itself, instance of B di-"inject" dari outside.

### Laravel: Automatic DI (Magic!)

Di Laravel, DI works automatically dan feels like magic. Lo simply type-hint di constructor dan Laravel Service Container takes care of the rest. Ini udah available sejak PHP 8, jadi kita nggak perlu manually create new instance untuk use service.

```php
class UserController extends Controller {
  public function __construct(
    private UserService $userService
  ) {}

  public function index() {
    return $this->userService->getAll();
  }
}
```

Code snippet di atas shows simple example of this. By injecting service this way, it is ready to use tanpa additional configuration di main setup. Ini yang bikin Laravel feels very comfortable to work with, especially untuk projects yang move fast.

### NestJS: Explicit DI (No Magic)

Di NestJS, DI juga works through constructor, tapi **there is no magic**. Everything must be explicitly declared di Module.

Every service di project must have:
1. **`@Injectable()` decorator** provided
2. **Registered in module** sebelum bisa dipake

Kalau lo skip step ini, lo akan get error.

```typescript
// cms.organization.service.ts
@Injectable() // required decorator
export class CmsOrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepo: Repository<Organization>,
  ) {}

  async paginate(
    query: PaginationRequest,
    search?: string,
  ): Promise<PaginatedResponse<OrganizationViewModel>> {
    // logic
  }
}

// cms.organization.module.ts
@Module({
  imports: [],
  providers: [
    CmsOrganizationService, // registered service
  ],
  controllers: [
    CmsOrganizationController,
  ],
  exports: [TypeOrmModule],
})
export class CmsOrganizationModule {}
```

### Key Takeaway

**Both frameworks use constructor injection.** Difference-nya adalah:
- **Laravel**: Does this implicitly — framework resolves everything automatically
- **NestJS**: Does this explicitly — developer must declare every dependency themselves

---

## 5. Validation

**Validation** adalah process of making sure data yang masuk ke application matches what is expected — format, type, length, dan presence of data.

### Laravel: Form Request

Di Laravel, validation is done using **Form Request** — dedicated class yang separates validation logic dari controller.

Lo actually bisa put validation directly di controller, tapi it's better to keep it separate, dan Laravel already provides Form Request untuk that purpose.

Laravel automatically runs validation sebelum request reaches controller method. Kalau fails, it automatically returns error response. Simple and straightforward.

```php
// StoreUserRequest.php
class StoreUserRequest extends FormRequest
{
  public function rules(): array
  {
    return [
      'name' => 'required|string|max:255',
      'email' => 'required|email|unique:users',
      'password' => 'required|min:8',
    ];
  }
}

// UserController.php
public function store(StoreUserRequest $request)
{
  User::create($request->validated());
}
```

### NestJS: DTO + Class Validator + Pipe

Di NestJS, validation is split into **three parts**: DTO, Class Validator, dan Pipe. Each one has its own responsibility.

#### 1. DTO (Data Transfer Object)

**DTO** is just a plain TypeScript class — no installation needed.

DTO class is used to define what data is expected di request object.

#### 2. Class Validator

**Class Validator** requires additional package. Lo need to install `class-validator` dan `class-transformer` sebelum using it.

Class Validator provides collection of validation decorators yang lo bisa use untuk define rules untuk each field. Decorators ini added directly ke DTO class.

```typescript
// DTO class
export class CreateUserDto {
  @IsNotEmpty() // validator
  @IsString()   // validator
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
```

#### 3. Pipe

**Pipe** is used to register validator di project configuration. Kalau nggak registered, validator will not run.

```typescript
// register Pipe on main.ts
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,              // strip property if not exists
    forbidNonWhitelisted: true,   // throw error if property not exists
    transform: true,              // auto transform type data based on DTO
  }));
  
  await app.listen(3000);
}
```

#### Using DTO in Controller

```typescript
// user.controller.ts
@Post()
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

### Key Differences

**Both frameworks validate request sebelum it reaches controller**, dan validation process happens outside controller. Error handling juga works the same way — runs automatically based on response code.

Difference-nya adalah:
- **Validation rules** slightly different, jadi lo need to adjust by reading documentation
- **Laravel**: Form Request validation runs automatically
- **NestJS**: Needs to be registered di main file
- **NestJS**: More verbose, tapi result is more **type-safe**

---

## 6. Authentication & Guards

**Authentication** adalah process of verifying who is accessing the application, confirming that user is really who they claim to be.

**Guard** adalah component responsible untuk protecting routes dan verifying tokens sebelum request reaches controller.

Simple example: user logs in dengan email dan password, application verifies whether credentials are valid dan then grants access.

### Laravel: Sanctum (Built-in)

Di latest version of Laravel, ada built-in package called **Sanctum**, yang commonly used untuk API authentication.

```php
public function login(Request $request)
{
  if (!Auth::attempt($request->only('email', 'password'))) {
    return response()->json(['message' => 'Invalid credentials'], 401);
  }

  $token = $request->user()->createToken('auth_token')->plainTextToken;
  return response()->json(['token' => $token]);
}

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
  Route::get('/profile', [UserController::class, 'profile']);
});
```

Ini example of using Sanctum in Laravel. **No additional installation needed** karena Sanctum comes built-in ketika lo install Laravel.

Result-nya adalah token yang bisa dipake untuk authentication ketika accessing API. Untuk protect API route, simply add Sanctum auth middleware ke route. Everything is already there, you just need to use it di right place.

### NestJS: JWT (Manual Setup)

Di NestJS, lo need to **install it separately**. Personally gue pake **JWT (JSON Web Token)** untuk authentication. Lo just need to install `@nestjs/jwt` untuk add JWT as authentication method.

#### 1. Login Service

```typescript
// user.service.ts
async login(email: string, password: string) {
  const user = await this.usersService.findByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = { sub: user.id, email: user.email };
  return {
    access_token: this.jwtService.sign(payload),
  };
}
```

#### 2. Auth Module Configuration

```typescript
// auth.module.ts
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
```

#### 3. Create Auth Guard

```typescript
// guards/auth.guard.ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) throw new UnauthorizedException('Token not found');

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload; // attach user to request
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
```

#### 4. Apply Guard to Controller

```typescript
// user.controller.ts
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  @Get()
  findAll() {}

  @Get('profile')
  getProfile() {}
}
```

Code snippet di atas adalah simple example of implementing authentication dan Guard in NestJS.

Di example ini, kita create login API yang returns access token as result. Kita juga need to create Guard untuk protect routes kita. Everything must then be registered di module. Once that is done, Guard can be applied ke any controller yang needs to be protected.

### Key Differences

In terms of purpose dan protection, **both are essentially the same**. Difference-nya hanya di setup:
- **Laravel**: Comes ready out of the box
- **NestJS**: Set up manually

**Token storage:**
- **Sanctum tokens**: Stored in database
- **JWT tokens**: Not stored in database

---

## 7. Object Relational Mapper (ORM)

**ORM (Object Relational Mapper)** adalah layer yang connects your code ke database. It allows you to interact dengan database tanpa writing raw SQL queries. Instead, you work dengan structures yang represent your database tables directly in your code.

### Laravel: Eloquent ORM (Built-in)

Ketika lo install Laravel, it comes bundled dengan **Eloquent ORM** out of the box. Eloquent uses **Active Record pattern**, dimana each model represents single table in database. That model is responsible untuk handling all database operations.

```php
class Organization extends Model
{
  protected $fillable = ['name', 'email'];
}

Organization::all(); // SELECT * FROM organizations
```

Code di atas adalah sample model named Organization, yang represents organization table in database. Query below shows function provided by Eloquent untuk retrieve data from database. Kita bisa use that function directly **tanpa injecting anything**.

### NestJS: TypeORM (Manual Setup)

Di NestJS, ORM must be **installed separately** dan there are many options to choose from. Personally gue pake **TypeORM**.

TypeORM uses **Data Mapper pattern**, yang means:
- **Entity** only defines the structure
- **Database operations** handled by Repository

#### 1. Create Entity

```typescript
// organization.entity.ts
@Entity('organizations')
export class Organization extends BaseModel {
  @Column({ name: 'code', type: 'varchar', length: 50, nullable: false })
  declare code: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  declare name: string;
}
```

#### 2. Use Repository in Service

```typescript
// organizations.service.ts
@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepo: Repository<Organization>,
  ) {}

  // Get all - simple
  findAll() {
    return this.organizationRepo.find();
  }
}
```

Ini simple example of using TypeORM in NestJS:
1. First, kita need to create **Entity** untuk represent database table
2. To perform query operations di logic kita, kita must use **Repository**
3. Kita **required to inject Entity into Repository**
4. This means Repository can only handle queries ke organization table, dan result will always be of type `Organization`

### Key Differences

**Pattern:**
- **Laravel Eloquent**: Active Record pattern (model handles everything)
- **NestJS TypeORM**: Data Mapper pattern (entity + repository separation)

**Setup:**
- **Laravel**: Comes built-in, ready to use
- **NestJS**: Must be installed and configured

**Usage:**
- **Laravel**: Direct model usage (`Organization::all()`)
- **NestJS**: Inject repository, then use (`this.organizationRepo.find()`)

---

## Kesimpulan

Transition dari Laravel ke NestJS bukan soal "mana yang lebih baik" — it's about **understanding the philosophy** behind each framework.

### Laravel: Fast & Magical

✅ **Pros:**
- Convention over Configuration
- Fast development
- Everything built-in
- Mature ecosystem
- Great for rapid delivery

❌ **Cons:**
- Less explicit
- "Magic" can hide complexity
- Less type safety (PHP)

### NestJS: Explicit & Type-Safe

✅ **Pros:**
- Explicit over Implicit
- TypeScript type safety
- Modular architecture
- Scalable for large projects
- Clear separation of concerns

❌ **Cons:**
- More boilerplate
- Steeper learning curve
- Manual configuration needed

### Yang Gue Pelajari

1. **Philosophy matters** — Understand framework philosophy sebelum dive in
2. **No magic in NestJS** — Everything must be declared explicitly
3. **Type safety is worth it** — TypeScript catches errors at compile time
4. **Modular is maintainable** — Separation makes large codebases easier
5. **Both are great** — Pick based on project needs, not hype

### Kapan Pilih Laravel?

- Fast-paced projects
- Small to medium apps
- Team familiar dengan PHP
- Rapid prototyping
- Prefer convention over configuration

### Kapan Pilih NestJS?

- Large-scale applications
- Need strong type safety
- Team familiar dengan TypeScript/Angular
- Complex domain logic
- Prefer explicit over implicit

Bagi gue personally, **learning both makes me a better developer**. Laravel taught me speed. NestJS taught me structure. Both skills are valuable.

Happy coding! 🚀

