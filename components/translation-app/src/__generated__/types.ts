export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    Date: { input: any; output: any };
    DateTime: { input: any; output: any };
    EmailAddress: { input: any; output: any };
    JSON: { input: any; output: any };
    NonNegativeFloat: { input: any; output: any };
    NonNegativeInt: { input: any; output: any };
    PhoneNumber: { input: any; output: any };
    PositiveInt: { input: any; output: any };
};

export type AcceptedContentType = {
    __typename?: 'AcceptedContentType';
    contentType: Scalars['String']['output'];
    extensionLabel?: Maybe<Scalars['String']['output']>;
};

export type AcceptedContentTypeInput = {
    contentType: Scalars['String']['input'];
    extensionLabel?: InputMaybe<Scalars['String']['input']>;
};

export type AccessToken = {
    __typename?: 'AccessToken';
    createdAt: Scalars['DateTime']['output'];
    id: Scalars['String']['output'];
    lastUsed?: Maybe<Scalars['DateTime']['output']>;
    name?: Maybe<Scalars['String']['output']>;
    secret?: Maybe<Scalars['String']['output']>;
    userId: Scalars['ID']['output'];
};

export type AccessTokenMutations = {
    __typename?: 'AccessTokenMutations';
    create: AccessToken;
    delete: Scalars['Int']['output'];
};

export type AccessTokenMutationsCreateArgs = {
    input: CreateAccessTokenInput;
    userId: Scalars['ID']['input'];
};

export type AccessTokenMutationsDeleteArgs = {
    id: Scalars['String']['input'];
};

export type AddLanguageInput = {
    code: Scalars['String']['input'];
    name: Scalars['String']['input'];
};

export type Address = {
    __typename?: 'Address';
    city?: Maybe<Scalars['String']['output']>;
    country?: Maybe<Scalars['String']['output']>;
    email?: Maybe<Scalars['EmailAddress']['output']>;
    firstName?: Maybe<Scalars['String']['output']>;
    id?: Maybe<Scalars['String']['output']>;
    lastName?: Maybe<Scalars['String']['output']>;
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']['output']>;
    middleName?: Maybe<Scalars['String']['output']>;
    phone?: Maybe<Scalars['String']['output']>;
    postalCode?: Maybe<Scalars['String']['output']>;
    state?: Maybe<Scalars['String']['output']>;
    street?: Maybe<Scalars['String']['output']>;
    street2?: Maybe<Scalars['String']['output']>;
    streetNumber?: Maybe<Scalars['String']['output']>;
    type: AddressType;
};

export type AddressMetaPropertyArgs = {
    key: Scalars['String']['input'];
};

export type AddressInput = {
    city?: InputMaybe<Scalars['String']['input']>;
    country?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['EmailAddress']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    middleName?: InputMaybe<Scalars['String']['input']>;
    phone?: InputMaybe<Scalars['String']['input']>;
    postalCode?: InputMaybe<Scalars['String']['input']>;
    state?: InputMaybe<Scalars['String']['input']>;
    street?: InputMaybe<Scalars['String']['input']>;
    street2?: InputMaybe<Scalars['String']['input']>;
    streetNumber?: InputMaybe<Scalars['String']['input']>;
    type: AddressType;
};

export enum AddressType {
    Billing = 'billing',
    Delivery = 'delivery',
    Other = 'other',
}

export type ApiCallMetrics = IObjectMetrics & {
    __typename?: 'ApiCallMetrics';
    count: Scalars['Int']['output'];
};

export type ApiCallMetricsCountArgs = {
    end?: InputMaybe<Scalars['DateTime']['input']>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type App = {
    __typename?: 'App';
    baseUrl: Scalars['String']['output'];
    createdAt: Scalars['DateTime']['output'];
    identifier: Scalars['String']['output'];
    name: Scalars['String']['output'];
    sessionUrl: Scalars['String']['output'];
    tenant?: Maybe<Tenant>;
    tenantId: Scalars['ID']['output'];
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AppConnection = {
    __typename?: 'AppConnection';
    edges?: Maybe<Array<AppConnectionEdge>>;
    pageInfo: PageInfo;
};

export type AppConnectionEdge = {
    __typename?: 'AppConnectionEdge';
    cursor: Scalars['String']['output'];
    node: App;
};

export type AppListFilter = {
    tenantId: Scalars['ID']['input'];
};

export type AppListSortOptions = {
    direction?: InputMaybe<SortDirection>;
    field?: InputMaybe<ImageSortField>;
};

export type AppMutations = {
    __typename?: 'AppMutations';
    create: App;
    delete: Scalars['Int']['output'];
    update: App;
};

export type AppMutationsCreateArgs = {
    input: CreateAppInput;
};

export type AppMutationsDeleteArgs = {
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type AppMutationsUpdateArgs = {
    identifier: Scalars['String']['input'];
    input: UpdateAppInput;
    tenantId: Scalars['ID']['input'];
};

export type AppQueries = {
    __typename?: 'AppQueries';
    get?: Maybe<App>;
    getMany: AppConnection;
};

export type AppQueriesGetArgs = {
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type AppQueriesGetManyArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    filter: AppListFilter;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<AppListSortOptions>;
};

export type ArchiveQueries = {
    __typename?: 'ArchiveQueries';
    get?: Maybe<ArchivedItemVersion>;
    getByNumber?: Maybe<ArchivedItemVersion>;
};

export type ArchiveQueriesGetArgs = {
    id: Scalars['ID']['input'];
};

export type ArchiveQueriesGetByNumberArgs = {
    itemId: Scalars['ID']['input'];
    language: Scalars['String']['input'];
    number: Scalars['Int']['input'];
    versionLabel?: VersionLabel;
};

export type ArchivedItemVersion = {
    __typename?: 'ArchivedItemVersion';
    archivedAt: Scalars['DateTime']['output'];
    archivedBy: Owner;
    id: Scalars['ID']['output'];
    item: Item;
    name?: Maybe<Scalars['String']['output']>;
    number: Scalars['Int']['output'];
};

export enum AuthenticationMethod {
    AccessTokenPair = 'accessTokenPair',
    None = 'none',
    StaticToken = 'staticToken',
}

export enum BandwidthUnit {
    Bytes = 'Bytes',
    GiB = 'GiB',
    KiB = 'KiB',
    MiB = 'MiB',
}

export type BandwidthUsageMetrics = {
    __typename?: 'BandwidthUsageMetrics';
    total: Scalars['Float']['output'];
};

export type BandwidthUsageMetricsTotalArgs = {
    end?: InputMaybe<Scalars['DateTime']['input']>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
    type?: InputMaybe<BandwidthUsageType>;
    unit?: BandwidthUnit;
};

export enum BandwidthUsageType {
    ApiCall = 'ApiCall',
    Media = 'Media',
}

export type BooleanComponentConfig = {
    __typename?: 'BooleanComponentConfig';
    multilingual?: Maybe<Scalars['Boolean']['output']>;
};

export type BooleanComponentConfigInput = {
    multilingual?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BooleanContent = {
    __typename?: 'BooleanContent';
    value?: Maybe<Scalars['Boolean']['output']>;
};

export type BooleanContentInput = {
    value: Scalars['Boolean']['input'];
};

export type BulkCreateDocumentInput = {
    components?: InputMaybe<Array<ComponentInput>>;
    createdAt?: InputMaybe<Scalars['DateTime']['input']>;
    externalReference?: InputMaybe<Scalars['String']['input']>;
    name: Scalars['String']['input'];
    topicIds?: InputMaybe<Array<Scalars['ID']['input']>>;
    tree?: InputMaybe<TreeNodeInput>;
};

export type BulkCreateFolderInput = {
    components?: InputMaybe<Array<ComponentInput>>;
    createdAt?: InputMaybe<Scalars['DateTime']['input']>;
    externalReference?: InputMaybe<Scalars['String']['input']>;
    name: Scalars['String']['input'];
    topicIds?: InputMaybe<Array<Scalars['ID']['input']>>;
    tree?: InputMaybe<TreeNodeInput>;
};

export type BulkCreateProductInput = {
    components?: InputMaybe<Array<ComponentInput>>;
    createdAt?: InputMaybe<Scalars['DateTime']['input']>;
    externalReference?: InputMaybe<Scalars['String']['input']>;
    name: Scalars['String']['input'];
    topicIds?: InputMaybe<Array<Scalars['ID']['input']>>;
    tree?: InputMaybe<TreeNodeInput>;
    variants: Array<CreateProductVariantInput>;
    vatTypeId: Scalars['ID']['input'];
};

export type BulkCreateShapeInput = {
    components?: InputMaybe<Array<ShapeComponentInput>>;
    identifier?: InputMaybe<Scalars['String']['input']>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    name: Scalars['String']['input'];
    type: ShapeType;
    variantComponents?: InputMaybe<Array<ShapeComponentInput>>;
};

export type BulkCreateTenantInput = {
    createdAt?: InputMaybe<Scalars['DateTime']['input']>;
    defaults?: InputMaybe<TenantDefaultsInput>;
    identifier: Scalars['String']['input'];
    isActive?: InputMaybe<Scalars['Boolean']['input']>;
    isTrial?: InputMaybe<Scalars['Boolean']['input']>;
    logo?: InputMaybe<ImageInput>;
    name: Scalars['String']['input'];
    shapes?: InputMaybe<Array<BulkCreateShapeInput>>;
    vatTypes?: InputMaybe<Array<BulkCreateVatTypeInput>>;
};

export type BulkCreateTopicInput = {
    children?: InputMaybe<Array<CreateChildTopicInput>>;
    name: Scalars['String']['input'];
    parentId?: InputMaybe<Scalars['ID']['input']>;
    pathIdentifier?: InputMaybe<Scalars['String']['input']>;
};

export type BulkCreateUserInput = {
    companyName?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    marketingEmailConsentedAt?: InputMaybe<Scalars['DateTime']['input']>;
    sub?: InputMaybe<Scalars['String']['input']>;
    tocReadAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type BulkCreateVatTypeInput = {
    name: Scalars['String']['input'];
    percent: Scalars['Float']['input'];
    tenantId: Scalars['ID']['input'];
};

export type BulkTaskTenantCopyInfo = {
    __typename?: 'BulkTaskTenantCopyInfo';
    id: Scalars['ID']['output'];
};

export type CashPayment = PaymentType & {
    __typename?: 'CashPayment';
    cash?: Maybe<Scalars['String']['output']>;
    provider: PaymentProvider;
};

export type CashPaymentInput = {
    cash?: InputMaybe<Scalars['String']['input']>;
};

export type Component = {
    __typename?: 'Component';
    componentId: Scalars['String']['output'];
    content?: Maybe<ComponentContent>;
    name: Scalars['String']['output'];
    type: ComponentType;
};

export type ComponentChoiceComponentConfig = {
    __typename?: 'ComponentChoiceComponentConfig';
    choices: Array<ShapeComponent>;
    multilingual?: Maybe<Scalars['Boolean']['output']>;
};

export type ComponentChoiceComponentConfigInput = {
    choices: Array<ShapeComponentInput>;
    multilingual?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ComponentChoiceContent = {
    __typename?: 'ComponentChoiceContent';
    selectedComponent: Component;
};

export type ComponentConfig =
    | BooleanComponentConfig
    | ComponentChoiceComponentConfig
    | ContentChunkComponentConfig
    | DatetimeComponentConfig
    | FilesComponentConfig
    | GridRelationsComponentConfig
    | ImagesComponentConfig
    | ItemRelationsComponentConfig
    | LocationComponentConfig
    | NumericComponentConfig
    | ParagraphCollectionComponentConfig
    | PieceComponentConfig
    | PropertiesTableComponentConfig
    | RichTextComponentConfig
    | SelectionComponentConfig
    | SingleLineComponentConfig
    | VideosComponentConfig;

export type ComponentConfigInput = {
    boolean?: InputMaybe<BooleanComponentConfigInput>;
    componentChoice?: InputMaybe<ComponentChoiceComponentConfigInput>;
    contentChunk?: InputMaybe<ContentChunkComponentConfigInput>;
    datetime?: InputMaybe<DatetimeComponentConfigInput>;
    files?: InputMaybe<FilesComponentConfigInput>;
    gridRelations?: InputMaybe<GridRelationsComponentConfigInput>;
    images?: InputMaybe<ImagesComponentConfigInput>;
    itemRelations?: InputMaybe<ItemRelationsComponentConfigInput>;
    location?: InputMaybe<LocationComponentConfigInput>;
    numeric?: InputMaybe<NumericComponentConfigInput>;
    paragraphCollection?: InputMaybe<ParagraphCollectionComponentConfigInput>;
    propertiesTable?: InputMaybe<PropertiesTableComponentConfigInput>;
    richText?: InputMaybe<RichTextComponentConfigInput>;
    selection?: InputMaybe<SelectionComponentConfigInput>;
    singleLine?: InputMaybe<SingleLineComponentConfigInput>;
    videos?: InputMaybe<VideosComponentConfigInput>;
};

export type ComponentContent =
    | BooleanContent
    | ComponentChoiceContent
    | ContentChunkContent
    | DatetimeContent
    | FileContent
    | GridRelationsContent
    | ImageContent
    | ItemRelationsContent
    | LocationContent
    | NumericContent
    | ParagraphCollectionContent
    | PieceContent
    | PropertiesTableContent
    | RichTextContent
    | SelectionContent
    | SingleLineContent
    | VideoContent;

export type ComponentInput = {
    boolean?: InputMaybe<BooleanContentInput>;
    componentChoice?: InputMaybe<ComponentInput>;
    componentId: Scalars['String']['input'];
    contentChunk?: InputMaybe<ContentChunkContentInput>;
    datetime?: InputMaybe<DatetimeContentInput>;
    files?: InputMaybe<Array<FileInput>>;
    gridRelations?: InputMaybe<GridRelationsContentInput>;
    images?: InputMaybe<Array<ImageInput>>;
    itemRelations?: InputMaybe<ItemRelationsContentInput>;
    location?: InputMaybe<LocationContentInput>;
    numeric?: InputMaybe<NumericComponentContentInput>;
    paragraphCollection?: InputMaybe<ParagraphCollectionContentInput>;
    propertiesTable?: InputMaybe<PropertiesTableContentInput>;
    richText?: InputMaybe<RichTextContentInput>;
    selection?: InputMaybe<SelectionComponentContentInput>;
    singleLine?: InputMaybe<SingleLineContentInput>;
    videos?: InputMaybe<Array<VideoInput>>;
};

export enum ComponentType {
    Boolean = 'boolean',
    ComponentChoice = 'componentChoice',
    ContentChunk = 'contentChunk',
    Datetime = 'datetime',
    Files = 'files',
    GridRelations = 'gridRelations',
    Images = 'images',
    ItemRelations = 'itemRelations',
    Location = 'location',
    Numeric = 'numeric',
    ParagraphCollection = 'paragraphCollection',
    Piece = 'piece',
    PropertiesTable = 'propertiesTable',
    RichText = 'richText',
    Selection = 'selection',
    SingleLine = 'singleLine',
    Videos = 'videos',
}

export type ContentChunkComponentConfig = {
    __typename?: 'ContentChunkComponentConfig';
    components: Array<ShapeComponent>;
    multilingual?: Maybe<Scalars['Boolean']['output']>;
    repeatable: Scalars['Boolean']['output'];
};

export type ContentChunkComponentConfigInput = {
    components: Array<ShapeComponentInput>;
    multilingual?: InputMaybe<Scalars['Boolean']['input']>;
    repeatable?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentChunkContent = {
    __typename?: 'ContentChunkContent';
    chunks: Array<Array<Component>>;
};

export type ContentChunkContentInput = {
    chunks: Array<Array<ComponentInput>>;
};

export type ContractSubscriptionPlanReferenceInput = {
    identifier: Scalars['String']['input'];
    periodId: Scalars['ID']['input'];
};

export type CreateAccessTokenInput = {
    name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAppInput = {
    baseUrl: Scalars['String']['input'];
    identifier?: InputMaybe<Scalars['String']['input']>;
    name: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type CreateChildTopicInput = {
    children?: InputMaybe<Array<CreateChildTopicInput>>;
    name: Scalars['String']['input'];
    pathIdentifier?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCustomerAddressInput = {
    city?: InputMaybe<Scalars['String']['input']>;
    country?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['EmailAddress']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    middleName?: InputMaybe<Scalars['String']['input']>;
    phone?: InputMaybe<Scalars['String']['input']>;
    postalCode?: InputMaybe<Scalars['String']['input']>;
    state?: InputMaybe<Scalars['String']['input']>;
    street?: InputMaybe<Scalars['String']['input']>;
    street2?: InputMaybe<Scalars['String']['input']>;
    streetNumber?: InputMaybe<Scalars['String']['input']>;
    type: AddressType;
};

export type CreateCustomerInput = {
    addresses?: InputMaybe<Array<CreateCustomerAddressInput>>;
    birthDate?: InputMaybe<Scalars['Date']['input']>;
    companyName?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    externalReferences?: InputMaybe<Array<KeyValuePairInput>>;
    firstName: Scalars['String']['input'];
    identifier?: InputMaybe<Scalars['String']['input']>;
    lastName: Scalars['String']['input'];
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    middleName?: InputMaybe<Scalars['String']['input']>;
    phone?: InputMaybe<Scalars['String']['input']>;
    taxNumber?: InputMaybe<Scalars['String']['input']>;
    tenantId: Scalars['ID']['input'];
};

/** Creates a new document. Note that the shapeId input has been deprecated and will be removed in a future release. */
export type CreateDocumentInput = {
    components?: InputMaybe<Array<ComponentInput>>;
    createdAt?: InputMaybe<Scalars['DateTime']['input']>;
    externalReference?: InputMaybe<Scalars['String']['input']>;
    name: Scalars['String']['input'];
    shapeId?: InputMaybe<Scalars['ID']['input']>;
    shapeIdentifier?: InputMaybe<Scalars['String']['input']>;
    tenantId: Scalars['ID']['input'];
    topicIds?: InputMaybe<Array<Scalars['ID']['input']>>;
    tree?: InputMaybe<TreeNodeInput>;
};

export type CreateFolderInput = {
    components?: InputMaybe<Array<ComponentInput>>;
    createdAt?: InputMaybe<Scalars['DateTime']['input']>;
    externalReference?: InputMaybe<Scalars['String']['input']>;
    name: Scalars['String']['input'];
    shapeIdentifier?: InputMaybe<Scalars['String']['input']>;
    tenantId: Scalars['ID']['input'];
    topicIds?: InputMaybe<Array<Scalars['ID']['input']>>;
    tree?: InputMaybe<TreeNodeInput>;
};

export type CreateGridInput = {
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    name: Scalars['String']['input'];
    rows?: InputMaybe<Array<GridRowInput>>;
    tenantId: Scalars['ID']['input'];
};

export type CreateMarketInput = {
    customerIdentifiers?: InputMaybe<Array<Scalars['String']['input']>>;
    identifier: Scalars['String']['input'];
    name: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type CreatePipelineInput = {
    name: Scalars['String']['input'];
    stages?: InputMaybe<Array<CreatePipelineStageInput>>;
    tenantId: Scalars['ID']['input'];
};

export type CreatePipelineStageInput = {
    name: Scalars['String']['input'];
    placeNewOrders?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreatePriceListInput = {
    endDate?: InputMaybe<Scalars['DateTime']['input']>;
    identifier: Scalars['String']['input'];
    modifierType: PriceListModifierType;
    name: Scalars['String']['input'];
    priceVariants?: InputMaybe<Array<PriceListPriceVariantReferenceInput>>;
    selectedProductVariants: CreatePriceListSelectedProductVariantsInput;
    startDate?: InputMaybe<Scalars['DateTime']['input']>;
    targetAudience: CreatePriceListTargetAudienceInput;
    tenantId: Scalars['ID']['input'];
};

export type CreatePriceListProductVariant = {
    priceVariants?: InputMaybe<Array<PriceListProductPriceVariantReference>>;
    sku: Scalars['String']['input'];
};

export type CreatePriceListSelectedProductVariantsInput = {
    type: PriceListProductSelectionType;
    variants?: InputMaybe<Array<CreatePriceListProductVariant>>;
};

export type CreatePriceListTargetAudienceInput = {
    marketIdentifiers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    type: PriceListTargetAudienceType;
};

export type CreatePriceVariantInput = {
    currency?: InputMaybe<Scalars['String']['input']>;
    identifier: Scalars['String']['input'];
    name?: InputMaybe<Scalars['String']['input']>;
    tenantId: Scalars['ID']['input'];
};

export type CreateProductInput = {
    components?: InputMaybe<Array<ComponentInput>>;
    createdAt?: InputMaybe<Scalars['DateTime']['input']>;
    externalReference?: InputMaybe<Scalars['String']['input']>;
    name: Scalars['String']['input'];
    shapeIdentifier?: InputMaybe<Scalars['String']['input']>;
    tenantId: Scalars['ID']['input'];
    topicIds?: InputMaybe<Array<Scalars['ID']['input']>>;
    tree?: InputMaybe<TreeNodeInput>;
    variants: Array<CreateProductVariantInput>;
    vatTypeId: Scalars['ID']['input'];
};

export type CreateProductSubscriptionAddressInput = {
    city?: InputMaybe<Scalars['String']['input']>;
    country?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['EmailAddress']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    middleName?: InputMaybe<Scalars['String']['input']>;
    phone?: InputMaybe<Scalars['String']['input']>;
    postalCode?: InputMaybe<Scalars['String']['input']>;
    state?: InputMaybe<Scalars['String']['input']>;
    street?: InputMaybe<Scalars['String']['input']>;
    street2?: InputMaybe<Scalars['String']['input']>;
    streetNumber?: InputMaybe<Scalars['String']['input']>;
    type: AddressType;
};

export type CreateProductSubscriptionInput = {
    addresses?: InputMaybe<Array<CreateProductSubscriptionAddressInput>>;
    customerIdentifier: Scalars['String']['input'];
    initial?: InputMaybe<CreateProductSubscriptionPhaseInput>;
    item: CreateProductSubscriptionItemInput;
    meteredVariables?: InputMaybe<Array<CreateProductSubscriptionMeteredVariableInput>>;
    payment?: InputMaybe<PaymentInput>;
    recurring: CreateProductSubscriptionPhaseInput;
    status: CreateProductSubscriptionStatusInput;
    subscriptionPlan: ProductSubscriptionPlanReferenceInput;
    tenantId: Scalars['ID']['input'];
};

export type CreateProductSubscriptionItemInput = {
    imageUrl?: InputMaybe<Scalars['String']['input']>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    name: Scalars['String']['input'];
    sku: Scalars['String']['input'];
};

export type CreateProductSubscriptionMeteredVariableInput = {
    id: Scalars['ID']['input'];
    tierType: TierType;
    tiers: Array<CreateProductSubscriptionMeteredVariableTierInput>;
};

export type CreateProductSubscriptionMeteredVariableTierInput = {
    currency: Scalars['String']['input'];
    price: Scalars['Float']['input'];
    threshold: Scalars['Int']['input'];
};

export type CreateProductSubscriptionPhaseInput = {
    currency: Scalars['String']['input'];
    price: Scalars['Float']['input'];
};

export type CreateProductSubscriptionStatusInput = {
    activeUntil?: InputMaybe<Scalars['DateTime']['input']>;
    currency: Scalars['String']['input'];
    price: Scalars['Float']['input'];
    renewAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateProductVariantInput = {
    attributes?: InputMaybe<Array<ProductVariantAttributeInput>>;
    components?: InputMaybe<Array<ComponentInput>>;
    externalReference?: InputMaybe<Scalars['String']['input']>;
    images?: InputMaybe<Array<ImageInput>>;
    isDefault: Scalars['Boolean']['input'];
    name?: InputMaybe<Scalars['String']['input']>;
    price?: InputMaybe<Scalars['Float']['input']>;
    priceVariants?: InputMaybe<Array<PriceVariantReferenceInput>>;
    sku: Scalars['String']['input'];
    stock?: InputMaybe<Scalars['Int']['input']>;
    stockLocations?: InputMaybe<Array<StockLocationReferenceInput>>;
    subscriptionPlans?: InputMaybe<Array<SubscriptionPlanReferenceInput>>;
    videos?: InputMaybe<Array<VideoInput>>;
};

export type CreateShapeInput = {
    components?: InputMaybe<Array<ShapeComponentInput>>;
    identifier?: InputMaybe<Scalars['String']['input']>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    name: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
    type: ShapeType;
    variantComponents?: InputMaybe<Array<ShapeComponentInput>>;
};

export type CreateStockLocationInput = {
    identifier: Scalars['String']['input'];
    name: Scalars['String']['input'];
    settings?: InputMaybe<StockLocationSettingsInput>;
    tenantId: Scalars['ID']['input'];
};

export type CreateSubscriptionContractAddressInput = {
    city?: InputMaybe<Scalars['String']['input']>;
    country?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['EmailAddress']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    middleName?: InputMaybe<Scalars['String']['input']>;
    phone?: InputMaybe<Scalars['String']['input']>;
    postalCode?: InputMaybe<Scalars['String']['input']>;
    state?: InputMaybe<Scalars['String']['input']>;
    street?: InputMaybe<Scalars['String']['input']>;
    street2?: InputMaybe<Scalars['String']['input']>;
    streetNumber?: InputMaybe<Scalars['String']['input']>;
    type: AddressType;
};

export type CreateSubscriptionContractInput = {
    addresses?: InputMaybe<Array<CreateSubscriptionContractAddressInput>>;
    customerIdentifier: Scalars['String']['input'];
    initial?: InputMaybe<CreateSubscriptionContractPhaseInput>;
    item: CreateSubscriptionContractItemInput;
    payment?: InputMaybe<PaymentInput>;
    recurring: CreateSubscriptionContractPhaseInput;
    status: CreateSubscriptionContractStatusInput;
    subscriptionPlan: ContractSubscriptionPlanReferenceInput;
    tenantId: Scalars['ID']['input'];
};

export type CreateSubscriptionContractItemInput = {
    imageUrl?: InputMaybe<Scalars['String']['input']>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    name: Scalars['String']['input'];
    sku: Scalars['String']['input'];
};

export type CreateSubscriptionContractMeteredVariableReferenceInput = {
    id: Scalars['ID']['input'];
    tierType: TierType;
    tiers: Array<CreateSubscriptionContractMeteredVariableTierInput>;
};

export type CreateSubscriptionContractMeteredVariableTierInput = {
    currency: Scalars['String']['input'];
    price: Scalars['Float']['input'];
    threshold: Scalars['Int']['input'];
};

export type CreateSubscriptionContractPhaseInput = {
    currency: Scalars['String']['input'];
    meteredVariables?: InputMaybe<Array<CreateSubscriptionContractMeteredVariableReferenceInput>>;
    price: Scalars['Float']['input'];
};

export type CreateSubscriptionContractStatusInput = {
    activeUntil?: InputMaybe<Scalars['DateTime']['input']>;
    currency: Scalars['String']['input'];
    price: Scalars['Float']['input'];
    renewAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateSubscriptionPlanInput = {
    identifier: Scalars['String']['input'];
    meteredVariables?: InputMaybe<Array<SubscriptionPlanMeteredVariableInput>>;
    name?: InputMaybe<Scalars['String']['input']>;
    periods: Array<SubscriptionPlanPeriodInput>;
    tenantId: Scalars['ID']['input'];
};

export type CreateTenantInput = {
    createdAt?: InputMaybe<Scalars['DateTime']['input']>;
    defaults?: InputMaybe<TenantDefaultsInput>;
    identifier: Scalars['String']['input'];
    isActive?: InputMaybe<Scalars['Boolean']['input']>;
    isTrial?: InputMaybe<Scalars['Boolean']['input']>;
    logo?: InputMaybe<ImageInput>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    name: Scalars['String']['input'];
    shapes?: InputMaybe<Array<BulkCreateShapeInput>>;
    vatTypes?: InputMaybe<Array<BulkCreateVatTypeInput>>;
};

export type CreateTopicInput = {
    children?: InputMaybe<Array<CreateChildTopicInput>>;
    name: Scalars['String']['input'];
    parentId?: InputMaybe<Scalars['ID']['input']>;
    pathIdentifier?: InputMaybe<Scalars['String']['input']>;
    tenantId: Scalars['ID']['input'];
};

export type CreateUserInput = {
    companyName?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    marketingEmailConsentedAt?: InputMaybe<Scalars['DateTime']['input']>;
    sub: Array<Scalars['String']['input']>;
    tocReadAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateVatTypeInput = {
    name: Scalars['String']['input'];
    percent: Scalars['Float']['input'];
    tenantId: Scalars['ID']['input'];
};

export type CreateWebhookInput = {
    concern: Scalars['String']['input'];
    event: Scalars['String']['input'];
    graphqlQuery?: InputMaybe<Scalars['String']['input']>;
    headers?: InputMaybe<Array<WebhookHeaderInput>>;
    method: HttpMethod;
    name: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
    url: Scalars['String']['input'];
};

export type CreateWebhookInvocationInput = {
    end?: InputMaybe<Scalars['DateTime']['input']>;
    payload?: InputMaybe<Scalars['JSON']['input']>;
    responseBody?: InputMaybe<Scalars['JSON']['input']>;
    responseStatus?: InputMaybe<Scalars['Int']['input']>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CurrencySummary = {
    __typename?: 'CurrencySummary';
    currency?: Maybe<Scalars['String']['output']>;
    value?: Maybe<Scalars['Float']['output']>;
};

export type CurrencySummaryReport = {
    __typename?: 'CurrencySummaryReport';
    orders: Array<Maybe<CurrencySummary>>;
    sales: Array<Maybe<CurrencySummary>>;
};

export type CurrencySummaryReportOrdersArgs = {
    direction?: InputMaybe<SortDirection>;
    end?: InputMaybe<Scalars['DateTime']['input']>;
    orderBy?: InputMaybe<Parameter>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
    tenantId: Scalars['ID']['input'];
};

export type CurrencySummaryReportSalesArgs = {
    direction?: InputMaybe<SortDirection>;
    end?: InputMaybe<Scalars['DateTime']['input']>;
    orderBy?: InputMaybe<Parameter>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
    tenantId: Scalars['ID']['input'];
};

export type CustomPayment = PaymentType & {
    __typename?: 'CustomPayment';
    properties?: Maybe<Array<CustomProperties>>;
    provider: PaymentProvider;
};

export type CustomPaymentInput = {
    properties?: InputMaybe<Array<CustomPropertiesInput>>;
};

export type CustomProperties = {
    __typename?: 'CustomProperties';
    property: Scalars['String']['output'];
    value?: Maybe<Scalars['String']['output']>;
};

export type CustomPropertiesInput = {
    property: Scalars['String']['input'];
    value?: InputMaybe<Scalars['String']['input']>;
};

export type Customer = {
    __typename?: 'Customer';
    addresses?: Maybe<Array<Address>>;
    birthDate?: Maybe<Scalars['Date']['output']>;
    companyName?: Maybe<Scalars['String']['output']>;
    email?: Maybe<Scalars['String']['output']>;
    externalReference?: Maybe<Scalars['String']['output']>;
    externalReferences?: Maybe<Array<KeyValuePair>>;
    firstName?: Maybe<Scalars['String']['output']>;
    identifier?: Maybe<Scalars['String']['output']>;
    lastName?: Maybe<Scalars['String']['output']>;
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']['output']>;
    middleName?: Maybe<Scalars['String']['output']>;
    phone?: Maybe<Scalars['String']['output']>;
    taxNumber?: Maybe<Scalars['String']['output']>;
    tenantId?: Maybe<Scalars['ID']['output']>;
};

export type CustomerExternalReferenceArgs = {
    key: Scalars['String']['input'];
};

export type CustomerMetaPropertyArgs = {
    key: Scalars['String']['input'];
};

export type CustomerConnection = {
    __typename?: 'CustomerConnection';
    edges?: Maybe<Array<CustomerConnectionEdge>>;
    pageInfo: PageInfo;
};

export type CustomerConnectionEdge = {
    __typename?: 'CustomerConnectionEdge';
    cursor: Scalars['String']['output'];
    node: Customer;
};

export type CustomerExternalReferenceInput = {
    key: Scalars['String']['input'];
    value: Scalars['String']['input'];
};

export type CustomerInput = {
    addresses?: InputMaybe<Array<AddressInput>>;
    birthDate?: InputMaybe<Scalars['DateTime']['input']>;
    companyName?: InputMaybe<Scalars['String']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    identifier?: InputMaybe<Scalars['String']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    middleName?: InputMaybe<Scalars['String']['input']>;
    taxNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerMutations = {
    __typename?: 'CustomerMutations';
    create: Customer;
    createAddress: Customer;
    delete: Scalars['Int']['output'];
    deleteAddress: Scalars['Int']['output'];
    setMetadata: Customer;
    update: Customer;
    updateAddress: Customer;
};

export type CustomerMutationsCreateArgs = {
    input: CreateCustomerInput;
};

export type CustomerMutationsCreateAddressArgs = {
    identifier: Scalars['String']['input'];
    input: CreateCustomerAddressInput;
    tenantId: Scalars['ID']['input'];
};

export type CustomerMutationsDeleteArgs = {
    deleteSubscriptionContracts?: InputMaybe<Scalars['Boolean']['input']>;
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type CustomerMutationsDeleteAddressArgs = {
    addressId: Scalars['String']['input'];
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type CustomerMutationsSetMetadataArgs = {
    identifier: Scalars['String']['input'];
    key: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
    value: Scalars['String']['input'];
};

export type CustomerMutationsUpdateArgs = {
    identifier: Scalars['String']['input'];
    input: UpdateCustomerInput;
    tenantId: Scalars['ID']['input'];
};

export type CustomerMutationsUpdateAddressArgs = {
    addressId: Scalars['String']['input'];
    identifier: Scalars['String']['input'];
    input: UpdateCustomerAddressInput;
    tenantId: Scalars['ID']['input'];
};

export type CustomerQueries = {
    __typename?: 'CustomerQueries';
    get?: Maybe<Customer>;
    getMany?: Maybe<CustomerConnection>;
};

export type CustomerQueriesGetArgs = {
    externalReference?: InputMaybe<CustomerExternalReferenceInput>;
    identifier?: InputMaybe<Scalars['String']['input']>;
    tenantId: Scalars['ID']['input'];
};

export type CustomerQueriesGetManyArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    identifier?: InputMaybe<Scalars['ID']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    tenantId: Scalars['ID']['input'];
};

export type DatetimeComponentConfig = {
    __typename?: 'DatetimeComponentConfig';
    multilingual?: Maybe<Scalars['Boolean']['output']>;
};

export type DatetimeComponentConfigInput = {
    multilingual?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DatetimeContent = {
    __typename?: 'DatetimeContent';
    datetime?: Maybe<Scalars['DateTime']['output']>;
};

export type DatetimeContentInput = {
    datetime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DigitalAssetManagementPreferencesInput = {
    enabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DigitalAssetPreferences = {
    __typename?: 'DigitalAssetPreferences';
    enabled?: Maybe<Scalars['Boolean']['output']>;
};

export type Discount = {
    __typename?: 'Discount';
    percent?: Maybe<Scalars['Float']['output']>;
};

export type DiscountInput = {
    percent?: InputMaybe<Scalars['Float']['input']>;
};

export type Document = Item & {
    __typename?: 'Document';
    components?: Maybe<Array<Component>>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    externalReference?: Maybe<Scalars['String']['output']>;
    hasVersion?: Maybe<Scalars['Boolean']['output']>;
    id: Scalars['ID']['output'];
    language: Scalars['String']['output'];
    name?: Maybe<Scalars['String']['output']>;
    relatingItems?: Maybe<Array<Item>>;
    shape?: Maybe<Shape>;
    tenantId: Scalars['ID']['output'];
    topics?: Maybe<Array<Topic>>;
    tree?: Maybe<TreeNode>;
    type: ItemType;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
    version?: Maybe<VersionedRecordInfo>;
};

export type DocumentHasVersionArgs = {
    versionLabel?: InputMaybe<VersionLabel>;
};

export type DocumentMutations = {
    __typename?: 'DocumentMutations';
    create: Document;
    delete: Scalars['Int']['output'];
    publish: PublishInfo;
    unpublish?: Maybe<PublishInfo>;
    update: Document;
};

export type DocumentMutationsCreateArgs = {
    disableComponentValidation?: InputMaybe<Scalars['Boolean']['input']>;
    input: CreateDocumentInput;
    language: Scalars['String']['input'];
};

export type DocumentMutationsDeleteArgs = {
    id: Scalars['ID']['input'];
};

export type DocumentMutationsPublishArgs = {
    enableComponentValidation?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
    includeDescendants?: InputMaybe<Scalars['Boolean']['input']>;
    language: Scalars['String']['input'];
};

export type DocumentMutationsUnpublishArgs = {
    id: Scalars['ID']['input'];
    includeDescendants?: InputMaybe<Scalars['Boolean']['input']>;
    language: Scalars['String']['input'];
};

export type DocumentMutationsUpdateArgs = {
    disableComponentValidation?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
    input: UpdateDocumentInput;
    language: Scalars['String']['input'];
};

export type DocumentQueries = {
    __typename?: 'DocumentQueries';
    get?: Maybe<Document>;
};

export type DocumentQueriesGetArgs = {
    id: Scalars['ID']['input'];
    language: Scalars['String']['input'];
    versionLabel?: VersionLabel;
};

export type ExperimentalPreferenceEnabled = {
    __typename?: 'ExperimentalPreferenceEnabled';
    enabled?: Maybe<Scalars['Boolean']['output']>;
};

export type ExperimentalPreferenceEnabledInput = {
    enabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ExperimentalPreferences = {
    __typename?: 'ExperimentalPreferences';
    /** @deprecated Replaced by get with componentsOnVariants */
    componentsOnVariants?: Maybe<ExperimentalPreferenceEnabled>;
    /** @deprecated Replaced by get with dam */
    dam?: Maybe<DigitalAssetPreferences>;
    get?: Maybe<Preference>;
    /** @deprecated Replaced by get with nerdyView */
    nerdyView?: Maybe<NerdyViewPreferences>;
};

export type ExperimentalPreferencesGetArgs = {
    name: Scalars['String']['input'];
};

export type ExperimentalPreferencesInput = {
    componentsOnVariants?: InputMaybe<ExperimentalPreferenceEnabledInput>;
    dam?: InputMaybe<DigitalAssetManagementPreferencesInput>;
    nerdyView?: InputMaybe<NerdyViewPreferencesInput>;
};

export type File = {
    __typename?: 'File';
    contentType?: Maybe<Scalars['String']['output']>;
    key: Scalars['String']['output'];
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']['output']>;
    size?: Maybe<Scalars['Float']['output']>;
    title?: Maybe<Scalars['String']['output']>;
    url: Scalars['String']['output'];
};

export type FileMetaPropertyArgs = {
    key: Scalars['String']['input'];
};

export type FileContent = {
    __typename?: 'FileContent';
    files?: Maybe<Array<File>>;
};

export type FileContentInput = {
    files?: InputMaybe<Array<FileInput>>;
};

export type FileInput = {
    key: Scalars['String']['input'];
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    title?: InputMaybe<Scalars['String']['input']>;
};

export type FileQueries = {
    __typename?: 'FileQueries';
    get?: Maybe<File>;
};

export type FileQueriesGetArgs = {
    key: Scalars['String']['input'];
    language: Scalars['String']['input'];
};

export type FileSize = {
    __typename?: 'FileSize';
    size: Scalars['Float']['output'];
    unit: FileSizeUnit;
};

export enum FileSizeUnit {
    Bytes = 'Bytes',
    GiB = 'GiB',
    KiB = 'KiB',
    MiB = 'MiB',
}

export type FileUploadMutations = {
    __typename?: 'FileUploadMutations';
    generatePresignedRequest: PresignedUploadRequest;
};

export type FileUploadMutationsGeneratePresignedRequestArgs = {
    contentType: Scalars['String']['input'];
    filename: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
    type?: FileUploadType;
};

export enum FileUploadType {
    Media = 'MEDIA',
    Static = 'STATIC',
}

export type FilesComponentConfig = {
    __typename?: 'FilesComponentConfig';
    acceptedContentTypes?: Maybe<Array<AcceptedContentType>>;
    max?: Maybe<Scalars['Int']['output']>;
    maxFileSize?: Maybe<FileSize>;
    min?: Maybe<Scalars['Int']['output']>;
    multilingual?: Maybe<Scalars['Boolean']['output']>;
};

export type FilesComponentConfigInput = {
    acceptedContentTypes?: InputMaybe<Array<AcceptedContentTypeInput>>;
    max?: InputMaybe<Scalars['Int']['input']>;
    maxFileSize?: InputMaybe<MaxFileSizeInput>;
    min?: InputMaybe<Scalars['Int']['input']>;
    multilingual?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FocalPoint = {
    __typename?: 'FocalPoint';
    x: Scalars['Float']['output'];
    y: Scalars['Float']['output'];
};

export type FocalPointInput = {
    x: Scalars['Float']['input'];
    y: Scalars['Float']['input'];
};

export type Folder = Item & {
    __typename?: 'Folder';
    components?: Maybe<Array<Component>>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    externalReference?: Maybe<Scalars['String']['output']>;
    hasVersion?: Maybe<Scalars['Boolean']['output']>;
    id: Scalars['ID']['output'];
    language: Scalars['String']['output'];
    name?: Maybe<Scalars['String']['output']>;
    relatingItems?: Maybe<Array<Item>>;
    shape?: Maybe<Shape>;
    tenantId: Scalars['ID']['output'];
    topics?: Maybe<Array<Topic>>;
    tree?: Maybe<TreeNode>;
    type: ItemType;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
    version?: Maybe<VersionedRecordInfo>;
};

export type FolderHasVersionArgs = {
    versionLabel?: InputMaybe<VersionLabel>;
};

export type FolderMutations = {
    __typename?: 'FolderMutations';
    create: Folder;
    delete: Scalars['Int']['output'];
    publish: PublishInfo;
    unpublish?: Maybe<PublishInfo>;
    update: Folder;
};

export type FolderMutationsCreateArgs = {
    disableComponentValidation?: InputMaybe<Scalars['Boolean']['input']>;
    input: CreateFolderInput;
    language: Scalars['String']['input'];
};

export type FolderMutationsDeleteArgs = {
    id: Scalars['ID']['input'];
};

export type FolderMutationsPublishArgs = {
    enableComponentValidation?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
    includeDescendants?: InputMaybe<Scalars['Boolean']['input']>;
    language: Scalars['String']['input'];
};

export type FolderMutationsUnpublishArgs = {
    id: Scalars['ID']['input'];
    includeDescendants?: InputMaybe<Scalars['Boolean']['input']>;
    language: Scalars['String']['input'];
};

export type FolderMutationsUpdateArgs = {
    disableComponentValidation?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
    input: UpdateFolderInput;
    language: Scalars['String']['input'];
};

export type FolderQueries = {
    __typename?: 'FolderQueries';
    get?: Maybe<Folder>;
};

export type FolderQueriesGetArgs = {
    id: Scalars['ID']['input'];
    language: Scalars['String']['input'];
    versionLabel?: VersionLabel;
};

export type FullTreeNodeInput = {
    itemId: Scalars['ID']['input'];
    parentId: Scalars['ID']['input'];
    position?: InputMaybe<Scalars['PositiveInt']['input']>;
};

export type GenericPublishInput = {
    id: Scalars['ID']['input'];
    type: ShapeType;
};

export type GenericSuggestSearchResult = SuggestSearchResult & {
    __typename?: 'GenericSuggestSearchResult';
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    path: Scalars['String']['output'];
    tenantId: Scalars['ID']['output'];
    type: Scalars['String']['output'];
};

export type GetTopicByPathArguments = {
    path: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type Grid = {
    __typename?: 'Grid';
    createdAt: Scalars['DateTime']['output'];
    hasVersion: Scalars['Boolean']['output'];
    id: Scalars['ID']['output'];
    language: Scalars['String']['output'];
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']['output']>;
    name?: Maybe<Scalars['String']['output']>;
    rows: Array<GridRow>;
    tenantId: Scalars['ID']['output'];
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
    version?: Maybe<VersionedRecordInfo>;
};

export type GridHasVersionArgs = {
    versionLabel?: InputMaybe<VersionLabel>;
};

export type GridMetaPropertyArgs = {
    key: Scalars['String']['input'];
};

export type GridColumn = {
    __typename?: 'GridColumn';
    item?: Maybe<Item>;
    itemId?: Maybe<Scalars['ID']['output']>;
    itemType?: Maybe<Scalars['String']['output']>;
    layout?: Maybe<GridColumnLayout>;
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']['output']>;
};

export type GridColumnMetaPropertyArgs = {
    key: Scalars['String']['input'];
};

export type GridColumnInput = {
    itemId?: InputMaybe<Scalars['ID']['input']>;
    layout?: InputMaybe<GridLayoutInput>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
};

export type GridColumnLayout = {
    __typename?: 'GridColumnLayout';
    colspan?: Maybe<Scalars['Int']['output']>;
    rowspan?: Maybe<Scalars['Int']['output']>;
};

export type GridLayoutInput = {
    colspan?: InputMaybe<Scalars['Int']['input']>;
    rowspan?: InputMaybe<Scalars['Int']['input']>;
};

export type GridMutations = {
    __typename?: 'GridMutations';
    create: Grid;
    delete: Scalars['Int']['output'];
    publish: GridPublishInfo;
    unpublish?: Maybe<GridPublishInfo>;
    update: Grid;
};

export type GridMutationsCreateArgs = {
    input: CreateGridInput;
    language: Scalars['String']['input'];
};

export type GridMutationsDeleteArgs = {
    id: Scalars['ID']['input'];
};

export type GridMutationsPublishArgs = {
    id: Scalars['ID']['input'];
    language: Scalars['String']['input'];
};

export type GridMutationsUnpublishArgs = {
    id: Scalars['ID']['input'];
    language: Scalars['String']['input'];
};

export type GridMutationsUpdateArgs = {
    id: Scalars['ID']['input'];
    input: UpdateGridInput;
    language: Scalars['String']['input'];
};

export type GridPublishInfo = {
    __typename?: 'GridPublishInfo';
    id: Scalars['ID']['output'];
    versionId: Scalars['ID']['output'];
};

export type GridQueries = {
    __typename?: 'GridQueries';
    get?: Maybe<Grid>;
    getMany?: Maybe<Array<Grid>>;
};

export type GridQueriesGetArgs = {
    id: Scalars['ID']['input'];
    language: Scalars['String']['input'];
    versionLabel?: VersionLabel;
};

export type GridQueriesGetManyArgs = {
    language: Scalars['String']['input'];
    tenantId?: InputMaybe<Scalars['ID']['input']>;
    versionLabel?: VersionLabel;
};

export type GridRelationsComponentConfig = {
    __typename?: 'GridRelationsComponentConfig';
    multilingual?: Maybe<Scalars['Boolean']['output']>;
};

export type GridRelationsComponentConfigInput = {
    multilingual?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GridRelationsContent = {
    __typename?: 'GridRelationsContent';
    grids?: Maybe<Array<Grid>>;
};

export type GridRelationsContentInput = {
    gridIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type GridRow = {
    __typename?: 'GridRow';
    columns: Array<GridColumn>;
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']['output']>;
};

export type GridRowMetaPropertyArgs = {
    key: Scalars['String']['input'];
};

export type GridRowInput = {
    columns?: InputMaybe<Array<GridColumnInput>>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
};

export type Hreflang = {
    __typename?: 'Hreflang';
    language: Scalars['String']['output'];
    path: Scalars['String']['output'];
};

export enum HttpMethod {
    Delete = 'DELETE',
    Get = 'GET',
    Patch = 'PATCH',
    Post = 'POST',
    Put = 'PUT',
}

export type IObjectMetrics = {
    count: Scalars['Int']['output'];
};

export type IObjectMetricsCountArgs = {
    end?: InputMaybe<Scalars['DateTime']['input']>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type IObjectReports = {
    avg: Array<Maybe<ReportMetric>>;
    sum: Array<Maybe<ReportMetric>>;
    total: Scalars['Float']['output'];
};

export type IObjectReportsAvgArgs = {
    direction?: InputMaybe<SortDirection>;
    end?: InputMaybe<Scalars['DateTime']['input']>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<Parameter>;
    resolution?: InputMaybe<Interval>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type IObjectReportsSumArgs = {
    direction?: InputMaybe<SortDirection>;
    end?: InputMaybe<Scalars['DateTime']['input']>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<Parameter>;
    resolution?: InputMaybe<Interval>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type IObjectReportsTotalArgs = {
    end?: InputMaybe<Scalars['DateTime']['input']>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type IdentifierSuggestion = {
    __typename?: 'IdentifierSuggestion';
    isAvailable: Scalars['Boolean']['output'];
    suggestion: Scalars['String']['output'];
};

export type Image = {
    __typename?: 'Image';
    altText?: Maybe<Scalars['String']['output']>;
    caption?: Maybe<RichTextContent>;
    focalPoint?: Maybe<FocalPoint>;
    height?: Maybe<Scalars['Int']['output']>;
    itemCount: Scalars['Int']['output'];
    key: Scalars['String']['output'];
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']['output']>;
    mimeType?: Maybe<Scalars['String']['output']>;
    showcase?: Maybe<Array<ImageShowcase>>;
    url?: Maybe<Scalars['String']['output']>;
    variants?: Maybe<Array<ImageVariant>>;
    width?: Maybe<Scalars['Int']['output']>;
};

export type ImageItemCountArgs = {
    versionLabel?: VersionLabel;
};

export type ImageMetaPropertyArgs = {
    key: Scalars['String']['input'];
};

export type ImageConnection = {
    __typename?: 'ImageConnection';
    edges?: Maybe<Array<ImageConnectionEdge>>;
    pageInfo: PageInfo;
};

export type ImageConnectionEdge = {
    __typename?: 'ImageConnectionEdge';
    cursor: Scalars['String']['output'];
    node: Image;
};

export type ImageContent = {
    __typename?: 'ImageContent';
    images?: Maybe<Array<Image>>;
};

export enum ImageFileNameFilterCondition {
    Contains = 'contains',
    EndsWith = 'endsWith',
    StartsWith = 'startsWith',
}

export type ImageFileNameFilterInput = {
    condition?: ImageFileNameFilterCondition;
    value: Scalars['String']['input'];
};

export type ImageFilterInput = {
    filename?: InputMaybe<ImageFileNameFilterInput>;
    topicIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type ImageHotspotInput = {
    hotspot?: InputMaybe<FocalPointInput>;
    itemIds?: InputMaybe<Array<Scalars['ID']['input']>>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    skus?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ImageInput = {
    altText?: InputMaybe<Scalars['String']['input']>;
    caption?: InputMaybe<RichTextContentInput>;
    focalPoint?: InputMaybe<FocalPointInput>;
    hotspots?: InputMaybe<Array<ImageHotspotInput>>;
    key: Scalars['String']['input'];
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    mimeType?: InputMaybe<Scalars['String']['input']>;
};

export type ImageMutations = {
    __typename?: 'ImageMutations';
    delete: Scalars['Int']['output'];
    registerImage?: Maybe<Image>;
    registerVariants?: Maybe<Image>;
    update: Image;
};

export type ImageMutationsDeleteArgs = {
    key: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type ImageMutationsRegisterImageArgs = {
    key: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type ImageMutationsRegisterVariantsArgs = {
    key: Scalars['String']['input'];
    upsert?: InputMaybe<Scalars['Boolean']['input']>;
    variants: Array<ImageVariantInput>;
};

export type ImageMutationsUpdateArgs = {
    input: UpdateImageInput;
    key: Scalars['String']['input'];
    language: Scalars['String']['input'];
};

export type ImageQueries = {
    __typename?: 'ImageQueries';
    get?: Maybe<Image>;
    getItems?: Maybe<ItemConnection>;
    getMany?: Maybe<ImageConnection>;
    getTopics?: Maybe<TopicConnection>;
};

export type ImageQueriesGetArgs = {
    key: Scalars['String']['input'];
    language?: InputMaybe<Scalars['String']['input']>;
};

export type ImageQueriesGetItemsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    key: Scalars['String']['input'];
    language: Scalars['String']['input'];
    last?: InputMaybe<Scalars['Int']['input']>;
    tenantId: Scalars['ID']['input'];
    versionLabel?: VersionLabel;
};

export type ImageQueriesGetManyArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    filter?: InputMaybe<ImageFilterInput>;
    first?: InputMaybe<Scalars['Int']['input']>;
    language: Scalars['String']['input'];
    last?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<SortDirection>;
    sortField?: InputMaybe<ImageSortField>;
    tenantId: Scalars['ID']['input'];
};

export type ImageQueriesGetTopicsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    key: Scalars['String']['input'];
    language: Scalars['String']['input'];
    last?: InputMaybe<Scalars['Int']['input']>;
    tenantId: Scalars['ID']['input'];
};

export type ImageShowcase = {
    __typename?: 'ImageShowcase';
    hotspot?: Maybe<FocalPoint>;
    itemIds?: Maybe<Array<Scalars['ID']['output']>>;
    items?: Maybe<Array<Item>>;
    meta?: Maybe<Array<KeyValuePair>>;
    productVariants?: Maybe<Array<ProductVariant>>;
    skus?: Maybe<Array<Scalars['String']['output']>>;
};

export type ImageShowcaseItemsArgs = {
    language: Scalars['String']['input'];
    versionLabel?: VersionLabel;
};

export type ImageShowcaseProductVariantsArgs = {
    language: Scalars['String']['input'];
    versionLabel?: VersionLabel;
};

export enum ImageSortField {
    CreatedAt = 'createdAt',
}

export type ImageVariant = {
    __typename?: 'ImageVariant';
    height: Scalars['Int']['output'];
    key: Scalars['String']['output'];
    size?: Maybe<Scalars['Int']['output']>;
    url: Scalars['String']['output'];
    width: Scalars['Int']['output'];
};

export type ImageVariantInput = {
    height: Scalars['Int']['input'];
    key: Scalars['String']['input'];
    size?: InputMaybe<Scalars['Int']['input']>;
    width: Scalars['Int']['input'];
};

export type ImagesComponentConfig = {
    __typename?: 'ImagesComponentConfig';
    multilingual?: Maybe<Scalars['Boolean']['output']>;
};

export type ImagesComponentConfigInput = {
    multilingual?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum Interval {
    Annually = 'ANNUALLY',
    Daily = 'DAILY',
    Hourly = 'HOURLY',
    Monthly = 'MONTHLY',
}

export type InviteToken = {
    __typename?: 'InviteToken';
    createdAt: Scalars['DateTime']['output'];
    createdBy?: Maybe<Scalars['ID']['output']>;
    createdByUser?: Maybe<User>;
    expiresAt?: Maybe<Scalars['DateTime']['output']>;
    id: Scalars['ID']['output'];
    redeemedAt?: Maybe<Scalars['DateTime']['output']>;
    redeemedBy: Scalars['ID']['output'];
    redeemedByUser?: Maybe<User>;
    tenant: Tenant;
    tenantId: Scalars['ID']['output'];
    token: Scalars['ID']['output'];
};

export type InviteTokenMutations = {
    __typename?: 'InviteTokenMutations';
    create: InviteToken;
    redeem: InviteToken;
};

export type InviteTokenMutationsCreateArgs = {
    expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
    tenantId: Scalars['ID']['input'];
};

export type InviteTokenMutationsRedeemArgs = {
    token: Scalars['ID']['input'];
};

export type Item = {
    components?: Maybe<Array<Component>>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    externalReference?: Maybe<Scalars['String']['output']>;
    hasVersion?: Maybe<Scalars['Boolean']['output']>;
    id: Scalars['ID']['output'];
    language: Scalars['String']['output'];
    name?: Maybe<Scalars['String']['output']>;
    relatingItems?: Maybe<Array<Item>>;
    shape?: Maybe<Shape>;
    tenantId: Scalars['ID']['output'];
    topics?: Maybe<Array<Topic>>;
    tree?: Maybe<TreeNode>;
    type: ItemType;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
    version?: Maybe<VersionedRecordInfo>;
};

export type ItemHasVersionArgs = {
    versionLabel?: InputMaybe<VersionLabel>;
};

export type ItemComponentContentValidationError = {
    __typename?: 'ItemComponentContentValidationError';
    componentId: Scalars['String']['output'];
    error: ItemComponentContentValidationErrorDetails;
};

export type ItemComponentContentValidationErrorDetails = {
    __typename?: 'ItemComponentContentValidationErrorDetails';
    errorName: Scalars['String']['output'];
    message: Scalars['String']['output'];
    properties?: Maybe<Array<KeyValuePair>>;
};

export type ItemConnection = {
    __typename?: 'ItemConnection';
    edges?: Maybe<Array<ItemConnectionEdge>>;
    pageInfo: PageInfo;
};

export type ItemConnectionEdge = {
    __typename?: 'ItemConnectionEdge';
    cursor: Scalars['String']['output'];
    node: Item;
};

export type ItemMetrics = IObjectMetrics & {
    __typename?: 'ItemMetrics';
    count: Scalars['Int']['output'];
};

export type ItemMetricsCountArgs = {
    end?: InputMaybe<Scalars['DateTime']['input']>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
    type?: InputMaybe<ItemType>;
};

export type ItemMutations = {
    __typename?: 'ItemMutations';
    bulkPublish?: Maybe<Array<PublishInfo>>;
    bulkUnpublish?: Maybe<Array<PublishInfo>>;
    delete: Scalars['Int']['output'];
    publish: PublishInfo;
    unpublish?: Maybe<PublishInfo>;
    updateComponent: Item;
};

export type ItemMutationsBulkPublishArgs = {
    ids?: InputMaybe<Array<Scalars['ID']['input']>>;
    language: Scalars['String']['input'];
};

export type ItemMutationsBulkUnpublishArgs = {
    ids?: InputMaybe<Array<Scalars['ID']['input']>>;
    language: Scalars['String']['input'];
};

export type ItemMutationsDeleteArgs = {
    id: Scalars['ID']['input'];
};

export type ItemMutationsPublishArgs = {
    enableComponentValidation?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
    includeDescendants?: InputMaybe<Scalars['Boolean']['input']>;
    language: Scalars['String']['input'];
};

export type ItemMutationsUnpublishArgs = {
    id: Scalars['ID']['input'];
    includeDescendants?: InputMaybe<Scalars['Boolean']['input']>;
    language: Scalars['String']['input'];
};

export type ItemMutationsUpdateComponentArgs = {
    disableValidation?: InputMaybe<Scalars['Boolean']['input']>;
    input: ComponentInput;
    itemId: Scalars['ID']['input'];
    language: Scalars['String']['input'];
};

export type ItemQueries = {
    __typename?: 'ItemQueries';
    get?: Maybe<Item>;
    getComponentContentValidationErrors?: Maybe<Array<ItemComponentContentValidationError>>;
    getMany?: Maybe<Array<Item>>;
};

export type ItemQueriesGetArgs = {
    id: Scalars['ID']['input'];
    language: Scalars['String']['input'];
    versionLabel?: VersionLabel;
};

export type ItemQueriesGetComponentContentValidationErrorsArgs = {
    itemId: Scalars['ID']['input'];
    language: Scalars['String']['input'];
};

export type ItemQueriesGetManyArgs = {
    externalReferences?: InputMaybe<Array<Scalars['String']['input']>>;
    language: Scalars['String']['input'];
    tenantId?: InputMaybe<Scalars['ID']['input']>;
    versionLabel?: VersionLabel;
};

export type ItemRelationsComponentConfig = {
    __typename?: 'ItemRelationsComponentConfig';
    acceptedShapeIdentifiers?: Maybe<Array<Scalars['String']['output']>>;
    /** @deprecated max has been deprecated in favor of maxItems */
    max?: Maybe<Scalars['Int']['output']>;
    maxItems?: Maybe<Scalars['Int']['output']>;
    maxSkus?: Maybe<Scalars['Int']['output']>;
    /** @deprecated min has been deprecated in favor of minItems */
    min?: Maybe<Scalars['Int']['output']>;
    minItems?: Maybe<Scalars['Int']['output']>;
    minSkus?: Maybe<Scalars['Int']['output']>;
    multilingual?: Maybe<Scalars['Boolean']['output']>;
    quickSelect?: Maybe<ItemRelationsComponentQuickSelectConfig>;
};

export type ItemRelationsComponentConfigInput = {
    acceptedShapeIdentifiers?: InputMaybe<Array<Scalars['String']['input']>>;
    max?: InputMaybe<Scalars['Int']['input']>;
    maxItems?: InputMaybe<Scalars['Int']['input']>;
    maxSkus?: InputMaybe<Scalars['Int']['input']>;
    min?: InputMaybe<Scalars['Int']['input']>;
    minItems?: InputMaybe<Scalars['Int']['input']>;
    minSkus?: InputMaybe<Scalars['Int']['input']>;
    multilingual?: InputMaybe<Scalars['Boolean']['input']>;
    quickSelect?: InputMaybe<ItemRelationsComponentQuickSelectConfigInput>;
};

export type ItemRelationsComponentQuickSelectConfig = {
    __typename?: 'ItemRelationsComponentQuickSelectConfig';
    folders?: Maybe<Array<ItemRelationsComponentQuickSelectFolderConfig>>;
};

export type ItemRelationsComponentQuickSelectConfigInput = {
    folders?: InputMaybe<Array<ItemRelationsComponentQuickSelectFolderConfigInput>>;
};

export type ItemRelationsComponentQuickSelectFolderConfig = {
    __typename?: 'ItemRelationsComponentQuickSelectFolderConfig';
    folderId: Scalars['ID']['output'];
};

export type ItemRelationsComponentQuickSelectFolderConfigInput = {
    folderId: Scalars['ID']['input'];
};

export type ItemRelationsContent = {
    __typename?: 'ItemRelationsContent';
    items?: Maybe<Array<Item>>;
    productVariants?: Maybe<Array<ProductVariant>>;
};

export type ItemRelationsContentInput = {
    itemIds?: InputMaybe<Array<Scalars['ID']['input']>>;
    skus?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum ItemSortField {
    CreatedAt = 'createdAt',
}

export type ItemSuggestSearchResult = SuggestSearchResult & {
    __typename?: 'ItemSuggestSearchResult';
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    path: Scalars['String']['output'];
    shapeIdentifier: Scalars['String']['output'];
    tenantId: Scalars['ID']['output'];
    type: Scalars['String']['output'];
};

export enum ItemType {
    Document = 'document',
    Folder = 'folder',
    Product = 'product',
}

export type KeyValuePair = {
    __typename?: 'KeyValuePair';
    key: Scalars['String']['output'];
    value?: Maybe<Scalars['String']['output']>;
};

export type KeyValuePairInput = {
    key: Scalars['String']['input'];
    value?: InputMaybe<Scalars['String']['input']>;
};

export type KlarnaPayment = PaymentType & {
    __typename?: 'KlarnaPayment';
    id?: Maybe<Scalars['String']['output']>;
    merchantReference1?: Maybe<Scalars['String']['output']>;
    merchantReference2?: Maybe<Scalars['String']['output']>;
    metadata?: Maybe<Scalars['String']['output']>;
    orderId?: Maybe<Scalars['String']['output']>;
    provider: PaymentProvider;
    recurringToken?: Maybe<Scalars['String']['output']>;
    status?: Maybe<Scalars['String']['output']>;
};

export type KlarnaPaymentInput = {
    klarna?: InputMaybe<Scalars['String']['input']>;
    merchantReference1?: InputMaybe<Scalars['String']['input']>;
    merchantReference2?: InputMaybe<Scalars['String']['input']>;
    metadata?: InputMaybe<Scalars['String']['input']>;
    orderId?: InputMaybe<Scalars['String']['input']>;
    recurringToken?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Scalars['String']['input']>;
};

export type Language = {
    __typename?: 'Language';
    code: Scalars['String']['output'];
    name: Scalars['String']['output'];
    system: Scalars['Boolean']['output'];
};

export type LanguageMutations = {
    __typename?: 'LanguageMutations';
    add?: Maybe<Array<Language>>;
    remove?: Maybe<Array<Language>>;
    update?: Maybe<Array<Language>>;
};

export type LanguageMutationsAddArgs = {
    input: AddLanguageInput;
    tenantId: Scalars['ID']['input'];
};

export type LanguageMutationsRemoveArgs = {
    code: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type LanguageMutationsUpdateArgs = {
    code: Scalars['String']['input'];
    input: UpdateLanguageInput;
    tenantId: Scalars['ID']['input'];
};

export type LocationComponentConfig = {
    __typename?: 'LocationComponentConfig';
    multilingual?: Maybe<Scalars['Boolean']['output']>;
};

export type LocationComponentConfigInput = {
    multilingual?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LocationContent = {
    __typename?: 'LocationContent';
    lat?: Maybe<Scalars['Float']['output']>;
    long?: Maybe<Scalars['Float']['output']>;
};

export type LocationContentInput = {
    lat?: InputMaybe<Scalars['Float']['input']>;
    long?: InputMaybe<Scalars['Float']['input']>;
};

export type Market = {
    __typename?: 'Market';
    createdAt: Scalars['DateTime']['output'];
    customerIdentifiers?: Maybe<Array<Scalars['String']['output']>>;
    identifier: Scalars['String']['output'];
    name: Scalars['String']['output'];
    tenant: Tenant;
    tenantId: Scalars['ID']['output'];
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type MarketConnection = {
    __typename?: 'MarketConnection';
    edges?: Maybe<Array<MarketConnectionEdge>>;
    pageInfo: PageInfo;
};

export type MarketConnectionEdge = {
    __typename?: 'MarketConnectionEdge';
    cursor: Scalars['String']['output'];
    node: Market;
};

export type MarketMutations = {
    __typename?: 'MarketMutations';
    create: Market;
    delete: Scalars['Int']['output'];
    update: Market;
};

export type MarketMutationsCreateArgs = {
    input: CreateMarketInput;
};

export type MarketMutationsDeleteArgs = {
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type MarketMutationsUpdateArgs = {
    identifier: Scalars['String']['input'];
    input: UpdateMarketInput;
    tenantId: Scalars['ID']['input'];
};

export type MarketQueries = {
    __typename?: 'MarketQueries';
    get?: Maybe<Market>;
    getMany: MarketConnection;
};

export type MarketQueriesGetArgs = {
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type MarketQueriesGetManyArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    tenantId: Scalars['ID']['input'];
};

export type MaxFileSizeInput = {
    size: Scalars['Float']['input'];
    unit: FileSizeUnit;
};

export type MeMutations = {
    __typename?: 'MeMutations';
    generateAccessToken?: Maybe<AccessToken>;
    setPreference?: Maybe<Preference>;
    /** @deprecated replaced by setPreference */
    setPreferences?: Maybe<Preferences>;
    update?: Maybe<User>;
};

export type MeMutationsGenerateAccessTokenArgs = {
    input: CreateAccessTokenInput;
};

export type MeMutationsSetPreferenceArgs = {
    input: PreferenceInput;
    tenantId?: InputMaybe<Scalars['ID']['input']>;
};

export type MeMutationsSetPreferencesArgs = {
    input: PreferencesInput;
    tenantId?: InputMaybe<Scalars['ID']['input']>;
};

export type MeMutationsUpdateArgs = {
    input?: InputMaybe<UpdateUserInput>;
};

export type Mutation = {
    __typename?: 'Mutation';
    accessToken?: Maybe<AccessTokenMutations>;
    app?: Maybe<AppMutations>;
    customer?: Maybe<CustomerMutations>;
    document?: Maybe<DocumentMutations>;
    fileUpload?: Maybe<FileUploadMutations>;
    folder?: Maybe<FolderMutations>;
    grid?: Maybe<GridMutations>;
    image?: Maybe<ImageMutations>;
    inviteToken?: Maybe<InviteTokenMutations>;
    item?: Maybe<ItemMutations>;
    language?: Maybe<LanguageMutations>;
    /** **EXPERIMENTAL:** Watch out! This feature is still in testing process. */
    market: MarketMutations;
    me?: Maybe<MeMutations>;
    order?: Maybe<OrderMutations>;
    pipeline?: Maybe<PipelineMutations>;
    /** **EXPERIMENTAL:** Watch out! This feature is still in testing process. */
    priceList: PriceListMutations;
    priceVariant: PriceVariantMutations;
    product?: Maybe<ProductMutations>;
    /** @deprecated productSubscription has been deprecated in favor of subscriptionContract */
    productSubscription: ProductSubscriptionMutations;
    shape?: Maybe<ShapeMutations>;
    stockLocation: StockLocationMutations;
    subscriptionContract: SubscriptionContractMutations;
    subscriptionPlan: SubscriptionPlanMutations;
    tenant?: Maybe<TenantMutations>;
    topic?: Maybe<TopicMutations>;
    tree?: Maybe<TreeMutations>;
    user?: Maybe<UserMutations>;
    vatType?: Maybe<VatTypeMutations>;
    video?: Maybe<VideoMutations>;
    webhook?: Maybe<WebhookMutations>;
};

export type NerdyViewPreferences = {
    __typename?: 'NerdyViewPreferences';
    enabled?: Maybe<Scalars['Boolean']['output']>;
};

export type NerdyViewPreferencesInput = {
    enabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NumericComponentConfig = {
    __typename?: 'NumericComponentConfig';
    decimalPlaces?: Maybe<Scalars['Int']['output']>;
    multilingual?: Maybe<Scalars['Boolean']['output']>;
    units?: Maybe<Array<Scalars['String']['output']>>;
};

export type NumericComponentConfigInput = {
    decimalPlaces?: InputMaybe<Scalars['Int']['input']>;
    multilingual?: InputMaybe<Scalars['Boolean']['input']>;
    units?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type NumericComponentContentInput = {
    number: Scalars['Float']['input'];
    unit?: InputMaybe<Scalars['String']['input']>;
};

export type NumericContent = {
    __typename?: 'NumericContent';
    number: Scalars['Float']['output'];
    unit?: Maybe<Scalars['String']['output']>;
};

export enum Operation {
    Avg = 'AVG',
    Sum = 'SUM',
}

export type Order = {
    __typename?: 'Order';
    additionalInformation?: Maybe<Scalars['String']['output']>;
    cart: Array<OrderItem>;
    createdAt: Scalars['DateTime']['output'];
    customer?: Maybe<Customer>;
    id: Scalars['ID']['output'];
    meta?: Maybe<Array<KeyValuePair>>;
    payment?: Maybe<Array<Payment>>;
    pipelines?: Maybe<Array<OrderPipeline>>;
    tenant: Tenant;
    tenantId: Scalars['ID']['output'];
    total?: Maybe<Price>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderConnection = {
    __typename?: 'OrderConnection';
    edges?: Maybe<Array<OrderConnectionEdge>>;
    pageInfo: PageInfo;
};

export type OrderConnectionEdge = {
    __typename?: 'OrderConnectionEdge';
    cursor: Scalars['String']['output'];
    node: Order;
};

export type OrderItem = {
    __typename?: 'OrderItem';
    imageUrl?: Maybe<Scalars['String']['output']>;
    meta?: Maybe<Array<KeyValuePair>>;
    name: Scalars['String']['output'];
    orderId: Scalars['ID']['output'];
    price?: Maybe<Price>;
    productId?: Maybe<Scalars['ID']['output']>;
    /** @deprecated Product Subscription IDs have been deprecated in favor of Subscription Contract IDs. Querying for them will be removed in a future release. */
    productSubscriptionId?: Maybe<Scalars['ID']['output']>;
    /** @deprecated Product variant IDs have been deprecated and replaced by SKUs. */
    productVariantId?: Maybe<Scalars['ID']['output']>;
    quantity: Scalars['NonNegativeInt']['output'];
    sku?: Maybe<Scalars['String']['output']>;
    subTotal?: Maybe<Price>;
    subscription?: Maybe<OrderItemSubscription>;
    subscriptionContractId?: Maybe<Scalars['ID']['output']>;
};

export type OrderItemInput = {
    imageUrl?: InputMaybe<Scalars['String']['input']>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    name: Scalars['String']['input'];
    price?: InputMaybe<PriceInput>;
    productId?: InputMaybe<Scalars['ID']['input']>;
    productSubscriptionId?: InputMaybe<Scalars['ID']['input']>;
    quantity: Scalars['NonNegativeInt']['input'];
    sku?: InputMaybe<Scalars['String']['input']>;
    subTotal?: InputMaybe<PriceInput>;
    subscriptionContractId?: InputMaybe<Scalars['ID']['input']>;
};

export type OrderItemMeteredVariable = {
    __typename?: 'OrderItemMeteredVariable';
    id: Scalars['ID']['output'];
    price: Scalars['Float']['output'];
    usage: Scalars['Float']['output'];
};

export type OrderItemSubscription = {
    __typename?: 'OrderItemSubscription';
    end?: Maybe<Scalars['DateTime']['output']>;
    meteredVariables?: Maybe<Array<OrderItemMeteredVariable>>;
    name?: Maybe<Scalars['String']['output']>;
    period: Scalars['PositiveInt']['output'];
    start?: Maybe<Scalars['DateTime']['output']>;
    unit: OrderItemSubscriptionPeriodUnit;
};

export enum OrderItemSubscriptionPeriodUnit {
    Day = 'day',
    Hour = 'hour',
    Minute = 'minute',
    Month = 'month',
    Week = 'week',
    Year = 'year',
}

export type OrderMetrics = IObjectMetrics & {
    __typename?: 'OrderMetrics';
    count: Scalars['Int']['output'];
};

export type OrderMetricsCountArgs = {
    end?: InputMaybe<Scalars['DateTime']['input']>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OrderMutations = {
    __typename?: 'OrderMutations';
    delete: Scalars['Int']['output'];
    removePipeline: Order;
    setPipelineStage: Order;
    update: Order;
};

export type OrderMutationsDeleteArgs = {
    id: Scalars['ID']['input'];
};

export type OrderMutationsRemovePipelineArgs = {
    orderId: Scalars['ID']['input'];
    pipelineId: Scalars['ID']['input'];
};

export type OrderMutationsSetPipelineStageArgs = {
    orderId: Scalars['ID']['input'];
    pipelineId: Scalars['ID']['input'];
    stageId: Scalars['ID']['input'];
};

export type OrderMutationsUpdateArgs = {
    id: Scalars['ID']['input'];
    input: UpdateOrderInput;
};

export type OrderPipeline = {
    __typename?: 'OrderPipeline';
    pipeline: Pipeline;
    pipelineId: Scalars['ID']['output'];
    stageId: Scalars['ID']['output'];
};

export type OrderQueries = {
    __typename?: 'OrderQueries';
    get?: Maybe<Order>;
    getMany?: Maybe<OrderConnection>;
};

export type OrderQueriesGetArgs = {
    id: Scalars['ID']['input'];
};

export type OrderQueriesGetManyArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    customerIdentifier?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    pipelineId?: InputMaybe<Scalars['ID']['input']>;
    pipelineStageId?: InputMaybe<Scalars['ID']['input']>;
    sort?: InputMaybe<SortDirection>;
    sortField?: InputMaybe<OrderSortField>;
    tenantId?: InputMaybe<Scalars['ID']['input']>;
};

export enum OrderSortField {
    CreatedAt = 'createdAt',
    UpdatedAt = 'updatedAt',
}

export type OrdersReport = {
    __typename?: 'OrdersReport';
    avg: Array<Maybe<ReportMetric>>;
    sum: Array<Maybe<ReportMetric>>;
    total: Scalars['Int']['output'];
};

export type OrdersReportAvgArgs = {
    direction?: InputMaybe<SortDirection>;
    end?: InputMaybe<Scalars['DateTime']['input']>;
    filterBySKUs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    groupBy?: InputMaybe<Parameter>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<Parameter>;
    resolution?: InputMaybe<Interval>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OrdersReportSumArgs = {
    direction?: InputMaybe<SortDirection>;
    end?: InputMaybe<Scalars['DateTime']['input']>;
    filterBySKUs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    groupBy?: InputMaybe<Parameter>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<Parameter>;
    resolution?: InputMaybe<Interval>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OrdersReportTotalArgs = {
    end?: InputMaybe<Scalars['DateTime']['input']>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Owner = {
    __typename?: 'Owner';
    companyName?: Maybe<Scalars['String']['output']>;
    email?: Maybe<Scalars['String']['output']>;
    firstName?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    lastName?: Maybe<Scalars['String']['output']>;
};

export type PageInfo = {
    __typename?: 'PageInfo';
    endCursor: Scalars['String']['output'];
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor: Scalars['String']['output'];
    totalNodes: Scalars['Int']['output'];
};

export type ParagraphCollectionComponentConfig = {
    __typename?: 'ParagraphCollectionComponentConfig';
    multilingual?: Maybe<Array<ParagraphCollectionComponentmultilingualProperties>>;
};

export type ParagraphCollectionComponentConfigInput = {
    multilingual?: InputMaybe<Array<ParagraphCollectionComponentmultilingualProperties>>;
};

export enum ParagraphCollectionComponentmultilingualProperties {
    Body = 'body',
    Images = 'images',
    Title = 'title',
    Videos = 'videos',
}

export type ParagraphCollectionContent = {
    __typename?: 'ParagraphCollectionContent';
    paragraphs?: Maybe<Array<ParagraphContent>>;
};

export type ParagraphCollectionContentInput = {
    paragraphs: Array<ParagraphContentInput>;
};

export type ParagraphContent = {
    __typename?: 'ParagraphContent';
    body?: Maybe<RichTextContent>;
    images?: Maybe<Array<Image>>;
    title?: Maybe<SingleLineContent>;
    videos?: Maybe<Array<Video>>;
};

export type ParagraphContentInput = {
    body?: InputMaybe<RichTextContentInput>;
    images?: InputMaybe<Array<ImageInput>>;
    title?: InputMaybe<SingleLineContentInput>;
    videos?: InputMaybe<Array<VideoInput>>;
};

export enum Parameter {
    Currency = 'CURRENCY',
    Date = 'DATE',
    Product = 'PRODUCT',
    Value = 'VALUE',
}

export enum PathResolutionMethod {
    Alias = 'alias',
    Canonical = 'canonical',
    History = 'history',
    Shortcut = 'shortcut',
}

export enum PathResolutionMethodArgs {
    Alias = 'alias',
    Any = 'any',
    Canonical = 'canonical',
    History = 'history',
    Shortcut = 'shortcut',
}

export type Paths = {
    __typename?: 'Paths';
    aliases?: Maybe<Array<Scalars['String']['output']>>;
    canonical?: Maybe<Scalars['String']['output']>;
    history?: Maybe<Array<Scalars['String']['output']>>;
    hreflangs?: Maybe<Array<Hreflang>>;
    shortcuts?: Maybe<Array<Shortcut>>;
};

export type Payment = CashPayment | CustomPayment | KlarnaPayment | PaypalPayment | StripePayment;

export type PaymentInput = {
    cash?: InputMaybe<CashPaymentInput>;
    custom?: InputMaybe<CustomPaymentInput>;
    klarna?: InputMaybe<KlarnaPaymentInput>;
    paypal?: InputMaybe<PaypalPaymentInput>;
    provider: PaymentProvider;
    stripe?: InputMaybe<StripePaymentInput>;
};

export enum PaymentProvider {
    Cash = 'cash',
    Custom = 'custom',
    Klarna = 'klarna',
    Paypal = 'paypal',
    Stripe = 'stripe',
}

export type PaymentType = {
    provider: PaymentProvider;
};

export type PaypalPayment = PaymentType & {
    __typename?: 'PaypalPayment';
    id?: Maybe<Scalars['String']['output']>;
    invoiceId?: Maybe<Scalars['String']['output']>;
    metadata?: Maybe<Scalars['String']['output']>;
    orderId?: Maybe<Scalars['String']['output']>;
    provider: PaymentProvider;
    subscriptionId?: Maybe<Scalars['String']['output']>;
};

export type PaypalPaymentInput = {
    invoiceId?: InputMaybe<Scalars['String']['input']>;
    metadata?: InputMaybe<Scalars['String']['input']>;
    orderId?: InputMaybe<Scalars['String']['input']>;
    paypal?: InputMaybe<Scalars['String']['input']>;
    subscriptionId?: InputMaybe<Scalars['String']['input']>;
};

export type PieceComponentConfig = {
    __typename?: 'PieceComponentConfig';
    identifier: Scalars['String']['output'];
    multilingual?: Maybe<Scalars['Boolean']['output']>;
};

export type PieceContent = {
    __typename?: 'PieceContent';
    components: Array<Component>;
};

export type Pipeline = {
    __typename?: 'Pipeline';
    createdAt: Scalars['DateTime']['output'];
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    orders: OrderConnection;
    stages?: Maybe<Array<PipelineStage>>;
    tenantId: Scalars['ID']['output'];
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PipelineOrdersArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<SortDirection>;
    sortField?: InputMaybe<OrderSortField>;
};

export type PipelineConnection = {
    __typename?: 'PipelineConnection';
    edges?: Maybe<Array<PipelineConnectionEdge>>;
    pageInfo: PageInfo;
};

export type PipelineConnectionEdge = {
    __typename?: 'PipelineConnectionEdge';
    cursor: Scalars['String']['output'];
    node: Pipeline;
};

export type PipelineMutations = {
    __typename?: 'PipelineMutations';
    addStage: Pipeline;
    create: Pipeline;
    delete?: Maybe<Scalars['Int']['output']>;
    moveStage: Pipeline;
    removeStage: Pipeline;
    update: Pipeline;
    updateStage: Pipeline;
};

export type PipelineMutationsAddStageArgs = {
    input: CreatePipelineStageInput;
    pipelineId: Scalars['ID']['input'];
    position?: InputMaybe<Scalars['Int']['input']>;
};

export type PipelineMutationsCreateArgs = {
    input: CreatePipelineInput;
};

export type PipelineMutationsDeleteArgs = {
    force?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
};

export type PipelineMutationsMoveStageArgs = {
    newPosition: Scalars['Int']['input'];
    pipelineId: Scalars['ID']['input'];
    stageId: Scalars['ID']['input'];
};

export type PipelineMutationsRemoveStageArgs = {
    force?: InputMaybe<Scalars['Boolean']['input']>;
    pipelineId: Scalars['ID']['input'];
    stageId: Scalars['ID']['input'];
};

export type PipelineMutationsUpdateArgs = {
    id: Scalars['ID']['input'];
    input?: InputMaybe<UpdatePipelineInput>;
};

export type PipelineMutationsUpdateStageArgs = {
    input: UpdatePipelineStageInput;
    pipelineId: Scalars['ID']['input'];
    stageId: Scalars['ID']['input'];
};

export type PipelineQueries = {
    __typename?: 'PipelineQueries';
    get?: Maybe<Pipeline>;
    getMany: PipelineConnection;
};

export type PipelineQueriesGetArgs = {
    id: Scalars['ID']['input'];
};

export type PipelineQueriesGetManyArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<SortDirection>;
    sortField?: InputMaybe<PipelineSortField>;
    tenantId: Scalars['ID']['input'];
};

export enum PipelineSortField {
    CreatedAt = 'createdAt',
}

export type PipelineStage = {
    __typename?: 'PipelineStage';
    createdAt: Scalars['DateTime']['output'];
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    orders: OrderConnection;
    placeNewOrders: Scalars['Boolean']['output'];
};

export type PipelineStageOrdersArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<SortDirection>;
    sortField?: InputMaybe<OrderSortField>;
};

export type Preference = {
    __typename?: 'Preference';
    enabled: Scalars['Boolean']['output'];
    name: Scalars['String']['output'];
};

export type PreferenceInput = {
    enabled?: InputMaybe<Scalars['Boolean']['input']>;
    experimental?: InputMaybe<Scalars['Boolean']['input']>;
    name: Scalars['String']['input'];
};

export type Preferences = {
    __typename?: 'Preferences';
    experimental?: Maybe<ExperimentalPreferences>;
};

export type PreferencesInput = {
    experimental?: InputMaybe<ExperimentalPreferencesInput>;
};

export type PresignedUploadRequest = {
    __typename?: 'PresignedUploadRequest';
    fields: Array<UploadField>;
    lifetime: Scalars['Int']['output'];
    maxSize: Scalars['Int']['output'];
    url?: Maybe<Scalars['String']['output']>;
};

export type Price = {
    __typename?: 'Price';
    currency: Scalars['String']['output'];
    discounts?: Maybe<Array<Discount>>;
    gross?: Maybe<Scalars['Float']['output']>;
    net?: Maybe<Scalars['Float']['output']>;
    tax?: Maybe<Tax>;
};

export type PriceInput = {
    currency: Scalars['String']['input'];
    discounts?: InputMaybe<Array<DiscountInput>>;
    gross?: InputMaybe<Scalars['Float']['input']>;
    net?: InputMaybe<Scalars['Float']['input']>;
    tax?: InputMaybe<TaxInput>;
};

export type PriceList = {
    __typename?: 'PriceList';
    createdAt: Scalars['DateTime']['output'];
    endDate?: Maybe<Scalars['DateTime']['output']>;
    identifier: Scalars['String']['output'];
    modifierType: PriceListModifierType;
    name: Scalars['String']['output'];
    price?: Maybe<Scalars['Float']['output']>;
    priceVariants?: Maybe<Array<PriceListPriceVariant>>;
    selectedProductVariants: PriceListSelectedProductVariants;
    startDate?: Maybe<Scalars['DateTime']['output']>;
    targetAudience: PriceListTargetAudience;
    tenant: Tenant;
    tenantId: Scalars['ID']['output'];
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PriceListPriceArgs = {
    identifier?: Scalars['String']['input'];
};

export type PriceListConnection = {
    __typename?: 'PriceListConnection';
    edges?: Maybe<Array<PriceListConnectionEdge>>;
    pageInfo: PageInfo;
};

export type PriceListConnectionEdge = {
    __typename?: 'PriceListConnectionEdge';
    cursor: Scalars['String']['output'];
    node: PriceList;
};

export enum PriceListModifierType {
    Absolute = 'ABSOLUTE',
    Percentage = 'PERCENTAGE',
    Relative = 'RELATIVE',
}

export type PriceListMutations = {
    __typename?: 'PriceListMutations';
    create: PriceList;
    delete: Scalars['Int']['output'];
    removeSelectedProductVariants: PriceList;
    update: PriceList;
    upsertSelectedProductVariants: PriceList;
};

export type PriceListMutationsCreateArgs = {
    input: CreatePriceListInput;
};

export type PriceListMutationsDeleteArgs = {
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type PriceListMutationsRemoveSelectedProductVariantsArgs = {
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
    variants: Array<Scalars['String']['input']>;
};

export type PriceListMutationsUpdateArgs = {
    identifier: Scalars['String']['input'];
    input: UpdatePriceListInput;
    tenantId: Scalars['ID']['input'];
};

export type PriceListMutationsUpsertSelectedProductVariantsArgs = {
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
    variants: Array<CreatePriceListProductVariant>;
};

export type PriceListPriceVariant = {
    __typename?: 'PriceListPriceVariant';
    decimalPlaces?: Maybe<Scalars['Int']['output']>;
    identifier: Scalars['String']['output'];
    modifier: Scalars['Float']['output'];
};

export type PriceListPriceVariantReferenceInput = {
    decimalPlaces?: InputMaybe<Scalars['Int']['input']>;
    identifier: Scalars['String']['input'];
    modifier: Scalars['Float']['input'];
};

export type PriceListProduct = {
    __typename?: 'PriceListProduct';
    priceVariants?: Maybe<Array<PriceListPriceVariant>>;
    sku: Scalars['String']['output'];
};

export type PriceListProductPriceVariantReference = {
    identifier: Scalars['String']['input'];
    modifier?: InputMaybe<Scalars['Float']['input']>;
};

export enum PriceListProductSelectionType {
    AllSkus = 'ALL_SKUS',
    SomeSkus = 'SOME_SKUS',
}

export type PriceListQueries = {
    __typename?: 'PriceListQueries';
    get?: Maybe<PriceList>;
    getMany?: Maybe<PriceListConnection>;
    getProductVariants?: Maybe<ProductVariantConnection>;
};

export type PriceListQueriesGetArgs = {
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type PriceListQueriesGetManyArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    tenantId: Scalars['ID']['input'];
};

export type PriceListQueriesGetProductVariantsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    identifier: Scalars['String']['input'];
    language: Scalars['String']['input'];
    last?: InputMaybe<Scalars['Int']['input']>;
    tenantId: Scalars['ID']['input'];
    versionLabel?: VersionLabel;
};

export type PriceListSelectedProductVariants = {
    __typename?: 'PriceListSelectedProductVariants';
    type?: Maybe<PriceListProductSelectionType>;
};

export type PriceListTargetAudience = {
    __typename?: 'PriceListTargetAudience';
    marketIdentifiers?: Maybe<Array<Scalars['String']['output']>>;
    type: PriceListTargetAudienceType;
};

export enum PriceListTargetAudienceType {
    Everyone = 'EVERYONE',
    Some = 'SOME',
}

export type PriceVariant = {
    __typename?: 'PriceVariant';
    createdAt: Scalars['DateTime']['output'];
    currency: Scalars['String']['output'];
    identifier: Scalars['String']['output'];
    name?: Maybe<Scalars['String']['output']>;
    tenant: Tenant;
    tenantId: Scalars['ID']['output'];
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PriceVariantMutations = {
    __typename?: 'PriceVariantMutations';
    create: PriceVariant;
    delete: Scalars['Int']['output'];
    update: PriceVariant;
};

export type PriceVariantMutationsCreateArgs = {
    input: CreatePriceVariantInput;
};

export type PriceVariantMutationsDeleteArgs = {
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type PriceVariantMutationsUpdateArgs = {
    identifier: Scalars['String']['input'];
    input: UpdatePriceVariantInput;
    tenantId: Scalars['ID']['input'];
};

export type PriceVariantQueries = {
    __typename?: 'PriceVariantQueries';
    get?: Maybe<PriceVariant>;
    getMany?: Maybe<Array<PriceVariant>>;
};

export type PriceVariantQueriesGetArgs = {
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type PriceVariantQueriesGetManyArgs = {
    tenantId: Scalars['ID']['input'];
};

export type PriceVariantReferenceInput = {
    identifier: Scalars['String']['input'];
    price?: InputMaybe<Scalars['Float']['input']>;
};

export type Product = Item & {
    __typename?: 'Product';
    components?: Maybe<Array<Component>>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    defaultVariant: ProductVariant;
    externalReference?: Maybe<Scalars['String']['output']>;
    hasVersion?: Maybe<Scalars['Boolean']['output']>;
    id: Scalars['ID']['output'];
    /** @deprecated option removed */
    isSubscriptionOnly?: Maybe<Scalars['Boolean']['output']>;
    /** @deprecated option removed */
    isVirtual?: Maybe<Scalars['Boolean']['output']>;
    language: Scalars['String']['output'];
    name?: Maybe<Scalars['String']['output']>;
    relatingItems?: Maybe<Array<Item>>;
    shape?: Maybe<Shape>;
    tenantId: Scalars['ID']['output'];
    topics?: Maybe<Array<Topic>>;
    tree?: Maybe<TreeNode>;
    type: ItemType;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
    variant?: Maybe<ProductVariant>;
    variants: Array<ProductVariant>;
    vatType?: Maybe<VatType>;
    vatTypeId?: Maybe<Scalars['ID']['output']>;
    version?: Maybe<VersionedRecordInfo>;
};

export type ProductHasVersionArgs = {
    versionLabel?: InputMaybe<VersionLabel>;
};

export type ProductVariantArgs = {
    sku: Scalars['String']['input'];
};

export type ProductMutations = {
    __typename?: 'ProductMutations';
    addVariant: Product;
    create: Product;
    delete: Scalars['Int']['output'];
    deleteVariant: Scalars['Int']['output'];
    publish: PublishInfo;
    setDefaultVariant: Product;
    unpublish?: Maybe<PublishInfo>;
    update: Product;
    updateStock: ProductStockLocation;
    updateVariant: Product;
    updateVariantComponent: Product;
};

export type ProductMutationsAddVariantArgs = {
    disableComponentValidation?: InputMaybe<Scalars['Boolean']['input']>;
    input: CreateProductVariantInput;
    language: Scalars['String']['input'];
    productId: Scalars['ID']['input'];
};

export type ProductMutationsCreateArgs = {
    disableComponentValidation?: InputMaybe<Scalars['Boolean']['input']>;
    input: CreateProductInput;
    language: Scalars['String']['input'];
};

export type ProductMutationsDeleteArgs = {
    id: Scalars['ID']['input'];
};

export type ProductMutationsDeleteVariantArgs = {
    sku: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type ProductMutationsPublishArgs = {
    enableComponentValidation?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
    includeDescendants?: InputMaybe<Scalars['Boolean']['input']>;
    language: Scalars['String']['input'];
};

export type ProductMutationsSetDefaultVariantArgs = {
    language: Scalars['String']['input'];
    productId: Scalars['ID']['input'];
    sku?: InputMaybe<Scalars['String']['input']>;
};

export type ProductMutationsUnpublishArgs = {
    id: Scalars['ID']['input'];
    includeDescendants?: InputMaybe<Scalars['Boolean']['input']>;
    language: Scalars['String']['input'];
};

export type ProductMutationsUpdateArgs = {
    disableComponentValidation?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
    input: UpdateProductInput;
    language: Scalars['String']['input'];
};

export type ProductMutationsUpdateStockArgs = {
    productId: Scalars['ID']['input'];
    sku: Scalars['String']['input'];
    stock: Scalars['Int']['input'];
    stockLocationIdentifier?: Scalars['String']['input'];
};

export type ProductMutationsUpdateVariantArgs = {
    disableComponentValidation?: InputMaybe<Scalars['Boolean']['input']>;
    input: UpdateSingleProductVariantInput;
    language: Scalars['String']['input'];
    productId: Scalars['ID']['input'];
    sku?: InputMaybe<Scalars['String']['input']>;
};

export type ProductMutationsUpdateVariantComponentArgs = {
    disableValidation?: InputMaybe<Scalars['Boolean']['input']>;
    input: ComponentInput;
    language: Scalars['String']['input'];
    productId: Scalars['ID']['input'];
    sku: Scalars['String']['input'];
};

export type ProductPriceVariant = {
    __typename?: 'ProductPriceVariant';
    currency?: Maybe<Scalars['String']['output']>;
    identifier: Scalars['String']['output'];
    name?: Maybe<Scalars['String']['output']>;
    price?: Maybe<Scalars['Float']['output']>;
    priceList?: Maybe<ProductVariantPriceList>;
    priceLists?: Maybe<Array<ProductVariantPriceList>>;
};

export type ProductPriceVariantPriceListArgs = {
    identifier: Scalars['String']['input'];
};

export type ProductQueries = {
    __typename?: 'ProductQueries';
    get?: Maybe<Product>;
    getVariants?: Maybe<Array<ProductVariant>>;
};

export type ProductQueriesGetArgs = {
    id: Scalars['ID']['input'];
    language: Scalars['String']['input'];
    versionLabel?: VersionLabel;
};

export type ProductQueriesGetVariantsArgs = {
    externalReferences?: InputMaybe<Array<Scalars['String']['input']>>;
    language: Scalars['String']['input'];
    skus?: InputMaybe<Array<Scalars['String']['input']>>;
    tenantId: Scalars['ID']['input'];
    versionLabel?: VersionLabel;
};

export type ProductStockLocation = {
    __typename?: 'ProductStockLocation';
    identifier: Scalars['String']['output'];
    meta?: Maybe<Array<KeyValuePair>>;
    name: Scalars['String']['output'];
    settings?: Maybe<StockLocationSettings>;
    stock?: Maybe<Scalars['Int']['output']>;
};

export type ProductSubscription = {
    __typename?: 'ProductSubscription';
    customer?: Maybe<Customer>;
    customerIdentifier: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    initial?: Maybe<ProductSubscriptionPhase>;
    item: ProductSubscriptionItem;
    payment?: Maybe<Payment>;
    recurring?: Maybe<ProductSubscriptionPhase>;
    status: ProductSubscriptionStatus;
    subscriptionPlan?: Maybe<SubscriptionPlan>;
    tenant: Tenant;
    tenantId: Scalars['ID']['output'];
    usage?: Maybe<Array<ProductSubscriptionUsage>>;
};

export type ProductSubscriptionUsageArgs = {
    end: Scalars['DateTime']['input'];
    start: Scalars['DateTime']['input'];
};

export type ProductSubscriptionConnection = {
    __typename?: 'ProductSubscriptionConnection';
    edges?: Maybe<Array<ProductSubscriptionConnectionEdge>>;
    pageInfo: PageInfo;
};

export type ProductSubscriptionConnectionEdge = {
    __typename?: 'ProductSubscriptionConnectionEdge';
    cursor: Scalars['String']['output'];
    node: ProductSubscription;
};

export type ProductSubscriptionHistoryEvent = {
    type: ProductSubscriptionHistoryEventType;
};

export type ProductSubscriptionHistoryEventCancellation = ProductSubscriptionHistoryEvent & {
    __typename?: 'ProductSubscriptionHistoryEventCancellation';
    activeUntil?: Maybe<Scalars['DateTime']['output']>;
    cancelledAt: Scalars['DateTime']['output'];
    deactivated: Scalars['Boolean']['output'];
    type: ProductSubscriptionHistoryEventType;
};

export type ProductSubscriptionHistoryEventRenewal = ProductSubscriptionHistoryEvent & {
    __typename?: 'ProductSubscriptionHistoryEventRenewal';
    activeUntil?: Maybe<Scalars['DateTime']['output']>;
    currency: Scalars['String']['output'];
    price: Scalars['Float']['output'];
    renewedAt: Scalars['DateTime']['output'];
    type: ProductSubscriptionHistoryEventType;
};

export type ProductSubscriptionHistoryEventRenewalDueBroadcast = ProductSubscriptionHistoryEvent & {
    __typename?: 'ProductSubscriptionHistoryEventRenewalDueBroadcast';
    broadcastAt: Scalars['DateTime']['output'];
    renewAt: Scalars['DateTime']['output'];
    type: ProductSubscriptionHistoryEventType;
};

export enum ProductSubscriptionHistoryEventType {
    Cancellation = 'CANCELLATION',
    Renewal = 'RENEWAL',
    RenewalDueBroadcast = 'RENEWAL_DUE_BROADCAST',
}

export type ProductSubscriptionItem = {
    __typename?: 'ProductSubscriptionItem';
    imageUrl?: Maybe<Scalars['String']['output']>;
    meta?: Maybe<Array<KeyValuePair>>;
    name: Scalars['String']['output'];
    quantity: Scalars['NonNegativeInt']['output'];
    sku: Scalars['String']['output'];
};

export type ProductSubscriptionMutations = {
    __typename?: 'ProductSubscriptionMutations';
    cancel: ProductSubscription;
    create: ProductSubscription;
    delete?: Maybe<Scalars['Int']['output']>;
    renew: ProductSubscription;
    update: ProductSubscription;
};

export type ProductSubscriptionMutationsCancelArgs = {
    deactivate?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
};

export type ProductSubscriptionMutationsCreateArgs = {
    input: CreateProductSubscriptionInput;
};

export type ProductSubscriptionMutationsDeleteArgs = {
    id: Scalars['ID']['input'];
};

export type ProductSubscriptionMutationsRenewArgs = {
    id: Scalars['ID']['input'];
};

export type ProductSubscriptionMutationsUpdateArgs = {
    id: Scalars['ID']['input'];
    input: UpdateProductSubscriptionInput;
};

export type ProductSubscriptionPhase = {
    __typename?: 'ProductSubscriptionPhase';
    currency: Scalars['String']['output'];
    period: Scalars['Int']['output'];
    price: Scalars['Float']['output'];
    unit: SubscriptionPeriodUnit;
};

export type ProductSubscriptionPlanReferenceInput = {
    identifier: Scalars['String']['input'];
    periodId: Scalars['ID']['input'];
};

export type ProductSubscriptionQueries = {
    __typename?: 'ProductSubscriptionQueries';
    get?: Maybe<ProductSubscription>;
    getMany?: Maybe<ProductSubscriptionConnection>;
};

export type ProductSubscriptionQueriesGetArgs = {
    id: Scalars['ID']['input'];
};

export type ProductSubscriptionQueriesGetManyArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    customerIdentifier?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<SortDirection>;
    sortField?: InputMaybe<ProductSubscriptionSortField>;
    tenantId: Scalars['ID']['input'];
};

export enum ProductSubscriptionSortField {
    UpdatedAt = 'updatedAt',
}

export type ProductSubscriptionStatus = {
    __typename?: 'ProductSubscriptionStatus';
    activeUntil?: Maybe<Scalars['DateTime']['output']>;
    currency: Scalars['String']['output'];
    price: Scalars['Float']['output'];
    renewAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductSubscriptionUsage = {
    __typename?: 'ProductSubscriptionUsage';
    meteredVariableId: Scalars['ID']['output'];
    quantity?: Maybe<Scalars['Float']['output']>;
};

export type ProductVariant = {
    __typename?: 'ProductVariant';
    attributes?: Maybe<Array<ProductVariantAttribute>>;
    components?: Maybe<Array<Component>>;
    externalReference?: Maybe<Scalars['String']['output']>;
    /** @deprecated Product variant IDs have been deprecated and replaced by SKUs. */
    id: Scalars['ID']['output'];
    images?: Maybe<Array<Image>>;
    isDefault: Scalars['Boolean']['output'];
    name?: Maybe<Scalars['String']['output']>;
    price?: Maybe<Scalars['Float']['output']>;
    priceVariants?: Maybe<Array<ProductPriceVariant>>;
    product: Product;
    productId: Scalars['ID']['output'];
    sku: Scalars['String']['output'];
    stock?: Maybe<Scalars['Int']['output']>;
    stockLocations?: Maybe<Array<ProductStockLocation>>;
    subscriptionPlans?: Maybe<Array<ProductVariantSubscriptionPlan>>;
    videos?: Maybe<Array<Video>>;
};

export type ProductVariantPriceArgs = {
    identifier?: Scalars['String']['input'];
};

export type ProductVariantStockArgs = {
    identifier?: Scalars['String']['input'];
};

export type ProductVariantAttribute = {
    __typename?: 'ProductVariantAttribute';
    attribute: Scalars['String']['output'];
    value: Scalars['String']['output'];
};

export type ProductVariantAttributeInput = {
    attribute: Scalars['String']['input'];
    value: Scalars['String']['input'];
};

export type ProductVariantConnection = {
    __typename?: 'ProductVariantConnection';
    edges?: Maybe<Array<ProductVariantConnectionEdge>>;
    pageInfo: PageInfo;
};

export type ProductVariantConnectionEdge = {
    __typename?: 'ProductVariantConnectionEdge';
    cursor: Scalars['String']['output'];
    node: ProductVariant;
};

export type ProductVariantPriceList = {
    __typename?: 'ProductVariantPriceList';
    endDate?: Maybe<Scalars['DateTime']['output']>;
    identifier: Scalars['String']['output'];
    modifier: Scalars['Float']['output'];
    modifierType: PriceListModifierType;
    price: Scalars['Float']['output'];
    startDate?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductVariantSubscriptionMeteredVariable = {
    __typename?: 'ProductVariantSubscriptionMeteredVariable';
    id: Scalars['ID']['output'];
    identifier: Scalars['String']['output'];
    name: Scalars['String']['output'];
    tierType: TierType;
    tiers: Array<ProductVariantSubscriptionPlanTier>;
};

export type ProductVariantSubscriptionPlan = {
    __typename?: 'ProductVariantSubscriptionPlan';
    identifier: Scalars['String']['output'];
    name?: Maybe<Scalars['String']['output']>;
    periods: Array<ProductVariantSubscriptionPlanPeriod>;
    tenantId: Scalars['ID']['output'];
};

export type ProductVariantSubscriptionPlanPeriod = {
    __typename?: 'ProductVariantSubscriptionPlanPeriod';
    id: Scalars['ID']['output'];
    initial?: Maybe<ProductVariantSubscriptionPlanPricing>;
    name: Scalars['String']['output'];
    recurring?: Maybe<ProductVariantSubscriptionPlanPricing>;
};

export type ProductVariantSubscriptionPlanPricing = {
    __typename?: 'ProductVariantSubscriptionPlanPricing';
    meteredVariables?: Maybe<Array<ProductVariantSubscriptionMeteredVariable>>;
    period: Scalars['Int']['output'];
    price?: Maybe<Scalars['Float']['output']>;
    priceVariants?: Maybe<Array<ProductPriceVariant>>;
    unit: SubscriptionPeriodUnit;
};

export type ProductVariantSubscriptionPlanPricingPriceArgs = {
    identifier?: InputMaybe<Scalars['String']['input']>;
};

export type ProductVariantSubscriptionPlanTier = {
    __typename?: 'ProductVariantSubscriptionPlanTier';
    price?: Maybe<Scalars['Float']['output']>;
    priceVariants?: Maybe<Array<ProductPriceVariant>>;
    threshold: Scalars['Int']['output'];
};

export type ProductVariantSubscriptionPlanTierPriceArgs = {
    identifier?: InputMaybe<Scalars['String']['input']>;
};

export type PropertiesTableComponentConfig = {
    __typename?: 'PropertiesTableComponentConfig';
    multilingual?: Maybe<Scalars['Boolean']['output']>;
    sections: Array<PropertiesTableComponentConfigSection>;
};

export type PropertiesTableComponentConfigInput = {
    multilingual?: InputMaybe<Scalars['Boolean']['input']>;
    sections: Array<PropertiesTableComponentConfigSectionInput>;
};

export type PropertiesTableComponentConfigSection = {
    __typename?: 'PropertiesTableComponentConfigSection';
    keys: Array<Scalars['String']['output']>;
    title?: Maybe<Scalars['String']['output']>;
};

export type PropertiesTableComponentConfigSectionInput = {
    keys: Array<Scalars['String']['input']>;
    title?: InputMaybe<Scalars['String']['input']>;
};

export type PropertiesTableComponentSection = {
    __typename?: 'PropertiesTableComponentSection';
    properties?: Maybe<Array<KeyValuePair>>;
    title?: Maybe<Scalars['String']['output']>;
};

export type PropertiesTableComponentSectionInput = {
    properties?: InputMaybe<Array<KeyValuePairInput>>;
    title?: InputMaybe<Scalars['String']['input']>;
};

export type PropertiesTableContent = {
    __typename?: 'PropertiesTableContent';
    sections?: Maybe<Array<PropertiesTableComponentSection>>;
};

export type PropertiesTableContentInput = {
    sections?: InputMaybe<Array<PropertiesTableComponentSectionInput>>;
};

export type PublishInfo = {
    __typename?: 'PublishInfo';
    id: Scalars['ID']['output'];
    language?: Maybe<Scalars['String']['output']>;
    versionId?: Maybe<Scalars['ID']['output']>;
};

export type Query = {
    __typename?: 'Query';
    app: AppQueries;
    archive: ArchiveQueries;
    currencySummary?: Maybe<CurrencySummaryReport>;
    customer: CustomerQueries;
    document: DocumentQueries;
    file: FileQueries;
    folder: FolderQueries;
    grid: GridQueries;
    image: ImageQueries;
    item: ItemQueries;
    /** **EXPERIMENTAL:** Watch out! This feature is still in testing process. */
    market: MarketQueries;
    me?: Maybe<User>;
    order: OrderQueries;
    pipeline: PipelineQueries;
    /** **EXPERIMENTAL:** Watch out! This feature is still in testing process. */
    priceList: PriceListQueries;
    priceVariant: PriceVariantQueries;
    product: ProductQueries;
    /** @deprecated productSubscription has been deprecated in favor of subscriptionContract */
    productSubscription: ProductSubscriptionQueries;
    report?: Maybe<TenantReports>;
    search?: Maybe<SearchQueries>;
    shape: ShapeQueries;
    stockLocation: StockLocationQueries;
    subscriptionContract: SubscriptionContractQueries;
    subscriptionContractEvent?: Maybe<SubscriptionContractEventQueries>;
    subscriptionPlan: SubscriptionPlanQueries;
    tenant: TenantQueries;
    topic: TopicQueries;
    tree: TreeQueries;
    user: UserQueries;
    version?: Maybe<VersionedServices>;
    webhook: WebhookQueries;
};

export type RegenerateSecretsInput = {
    signatureSecret?: InputMaybe<Scalars['Boolean']['input']>;
    staticAuthToken?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ReportMetric = {
    __typename?: 'ReportMetric';
    currency?: Maybe<Scalars['String']['output']>;
    date?: Maybe<Scalars['DateTime']['output']>;
    name?: Maybe<Scalars['String']['output']>;
    product?: Maybe<Product>;
    sku?: Maybe<Scalars['String']['output']>;
    value: Scalars['Float']['output'];
};

export type ReportMetricProductArgs = {
    language: Scalars['String']['input'];
};

export type RichTextComponentConfig = {
    __typename?: 'RichTextComponentConfig';
    multilingual?: Maybe<Scalars['Boolean']['output']>;
};

export type RichTextComponentConfigInput = {
    multilingual?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RichTextContent = {
    __typename?: 'RichTextContent';
    html?: Maybe<Array<Scalars['String']['output']>>;
    json?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
    plainText?: Maybe<Array<Scalars['String']['output']>>;
};

export type RichTextContentInput = {
    html?: InputMaybe<Array<Scalars['String']['input']>>;
    json?: InputMaybe<Array<Scalars['JSON']['input']>>;
};

export type SalesReport = IObjectReports & {
    __typename?: 'SalesReport';
    avg: Array<Maybe<ReportMetric>>;
    sum: Array<Maybe<ReportMetric>>;
    total: Scalars['Float']['output'];
};

export type SalesReportAvgArgs = {
    direction?: InputMaybe<SortDirection>;
    end?: InputMaybe<Scalars['DateTime']['input']>;
    filterBySKUs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    groupBy?: InputMaybe<Parameter>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<Parameter>;
    resolution?: InputMaybe<Interval>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SalesReportSumArgs = {
    direction?: InputMaybe<SortDirection>;
    end?: InputMaybe<Scalars['DateTime']['input']>;
    filterBySKUs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    groupBy?: InputMaybe<Parameter>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<Parameter>;
    resolution?: InputMaybe<Interval>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SalesReportTotalArgs = {
    end?: InputMaybe<Scalars['DateTime']['input']>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SearchQueries = {
    __typename?: 'SearchQueries';
    suggest?: Maybe<SuggestSearchConnection>;
    topics?: Maybe<TopicSearchConnection>;
};

export type SearchQueriesSuggestArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    language: Scalars['String']['input'];
    searchTerm?: InputMaybe<Scalars['String']['input']>;
    tenantId: Scalars['ID']['input'];
    types?: InputMaybe<Array<SuggestSearchItemType>>;
};

export type SearchQueriesTopicsArgs = {
    language: Scalars['String']['input'];
    searchTerm?: InputMaybe<Scalars['String']['input']>;
    tenantId: Scalars['ID']['input'];
};

export type SelectionComponentConfig = {
    __typename?: 'SelectionComponentConfig';
    max?: Maybe<Scalars['Int']['output']>;
    min?: Maybe<Scalars['Int']['output']>;
    multilingual?: Maybe<Scalars['Boolean']['output']>;
    options: Array<SelectionComponentOptionConfig>;
};

export type SelectionComponentConfigInput = {
    max?: InputMaybe<Scalars['Int']['input']>;
    min?: InputMaybe<Scalars['Int']['input']>;
    multilingual?: InputMaybe<Scalars['Boolean']['input']>;
    options: Array<SelectionComponentOptionConfigInput>;
};

export type SelectionComponentContentInput = {
    keys: Array<Scalars['String']['input']>;
};

export type SelectionComponentOptionConfig = {
    __typename?: 'SelectionComponentOptionConfig';
    isPreselected?: Maybe<Scalars['Boolean']['output']>;
    key: Scalars['String']['output'];
    value: Scalars['String']['output'];
};

export type SelectionComponentOptionConfigInput = {
    isPreselected?: InputMaybe<Scalars['Boolean']['input']>;
    key: Scalars['String']['input'];
    value: Scalars['String']['input'];
};

export type SelectionContent = {
    __typename?: 'SelectionContent';
    options: Array<KeyValuePair>;
};

export type Shape = {
    __typename?: 'Shape';
    components?: Maybe<Array<ShapeComponent>>;
    createdAt: Scalars['DateTime']['output'];
    /** @deprecated Shape IDs have been deprecated in favor of human readable identifiers. Querying for them will be removed in a future release. */
    id?: Maybe<Scalars['ID']['output']>;
    identifier: Scalars['String']['output'];
    itemCount: Scalars['Int']['output'];
    items?: Maybe<Array<Item>>;
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']['output']>;
    name: Scalars['String']['output'];
    tenantId: Scalars['ID']['output'];
    type: ShapeType;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
    variantComponents?: Maybe<Array<ShapeComponent>>;
};

export type ShapeItemsArgs = {
    language: Scalars['String']['input'];
};

export type ShapeMetaPropertyArgs = {
    key: Scalars['String']['input'];
};

export type ShapeComponent = {
    __typename?: 'ShapeComponent';
    config?: Maybe<ComponentConfig>;
    description?: Maybe<Scalars['String']['output']>;
    id: Scalars['String']['output'];
    name: Scalars['String']['output'];
    type: ComponentType;
};

export type ShapeComponentInput = {
    config?: InputMaybe<ComponentConfigInput>;
    description?: InputMaybe<Scalars['String']['input']>;
    id?: InputMaybe<Scalars['String']['input']>;
    name: Scalars['String']['input'];
    type: ComponentType;
};

export type ShapeMetrics = IObjectMetrics & {
    __typename?: 'ShapeMetrics';
    count: Scalars['Int']['output'];
};

export type ShapeMetricsCountArgs = {
    end?: InputMaybe<Scalars['DateTime']['input']>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ShapeMutations = {
    __typename?: 'ShapeMutations';
    create: Shape;
    delete: Scalars['Int']['output'];
    /** @deprecated Migrating legacy shape ids will be removed in a future release. */
    migrateLegacyId: Shape;
    update: Shape;
};

export type ShapeMutationsCreateArgs = {
    input: CreateShapeInput;
};

export type ShapeMutationsDeleteArgs = {
    identifier?: InputMaybe<Scalars['String']['input']>;
    tenantId?: InputMaybe<Scalars['ID']['input']>;
};

export type ShapeMutationsMigrateLegacyIdArgs = {
    id: Scalars['String']['input'];
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type ShapeMutationsUpdateArgs = {
    identifier?: InputMaybe<Scalars['String']['input']>;
    input: UpdateShapeInput;
    tenantId?: InputMaybe<Scalars['ID']['input']>;
};

export type ShapeQueries = {
    __typename?: 'ShapeQueries';
    get?: Maybe<Shape>;
    getMany?: Maybe<Array<Shape>>;
};

export type ShapeQueriesGetArgs = {
    identifier?: InputMaybe<Scalars['String']['input']>;
    tenantId?: InputMaybe<Scalars['ID']['input']>;
};

export type ShapeQueriesGetManyArgs = {
    tenantId: Scalars['ID']['input'];
};

export enum ShapeType {
    Document = 'document',
    Folder = 'folder',
    Product = 'product',
}

export type Shortcut = {
    __typename?: 'Shortcut';
    parent?: Maybe<TreeNode>;
    parentId?: Maybe<Scalars['ID']['output']>;
    path: Scalars['String']['output'];
    position?: Maybe<Scalars['PositiveInt']['output']>;
};

export type SingleLineComponentConfig = {
    __typename?: 'SingleLineComponentConfig';
    multilingual?: Maybe<Scalars['Boolean']['output']>;
};

export type SingleLineComponentConfigInput = {
    multilingual?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SingleLineContent = {
    __typename?: 'SingleLineContent';
    text?: Maybe<Scalars['String']['output']>;
};

export type SingleLineContentInput = {
    text?: InputMaybe<Scalars['String']['input']>;
};

export enum SortDirection {
    Asc = 'asc',
    Desc = 'desc',
}

export type StockLocation = {
    __typename?: 'StockLocation';
    identifier: Scalars['String']['output'];
    name: Scalars['String']['output'];
    settings: StockLocationSettings;
    tenant: Tenant;
    tenantId: Scalars['ID']['output'];
};

export type StockLocationMutations = {
    __typename?: 'StockLocationMutations';
    create: StockLocation;
    delete: Scalars['Int']['output'];
    update: StockLocation;
};

export type StockLocationMutationsCreateArgs = {
    input: CreateStockLocationInput;
};

export type StockLocationMutationsDeleteArgs = {
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type StockLocationMutationsUpdateArgs = {
    identifier: Scalars['String']['input'];
    input: UpdateStockLocationInput;
    tenantId: Scalars['ID']['input'];
};

export type StockLocationQueries = {
    __typename?: 'StockLocationQueries';
    get?: Maybe<StockLocation>;
    getMany?: Maybe<Array<StockLocation>>;
};

export type StockLocationQueriesGetArgs = {
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type StockLocationQueriesGetManyArgs = {
    tenantId: Scalars['ID']['input'];
};

export type StockLocationReferenceInput = {
    identifier: Scalars['String']['input'];
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    stock?: InputMaybe<Scalars['Int']['input']>;
};

export type StockLocationSettings = {
    __typename?: 'StockLocationSettings';
    minimum?: Maybe<Scalars['Int']['output']>;
    unlimited: Scalars['Boolean']['output'];
};

export type StockLocationSettingsInput = {
    minimum?: InputMaybe<Scalars['Int']['input']>;
};

export type StripePayment = PaymentType & {
    __typename?: 'StripePayment';
    customerId?: Maybe<Scalars['String']['output']>;
    id?: Maybe<Scalars['String']['output']>;
    metadata?: Maybe<Scalars['String']['output']>;
    orderId?: Maybe<Scalars['String']['output']>;
    paymentIntentId?: Maybe<Scalars['String']['output']>;
    paymentMethod?: Maybe<Scalars['String']['output']>;
    paymentMethodId?: Maybe<Scalars['String']['output']>;
    provider: PaymentProvider;
    subscriptionId?: Maybe<Scalars['String']['output']>;
};

export type StripePaymentInput = {
    customerId?: InputMaybe<Scalars['String']['input']>;
    metadata?: InputMaybe<Scalars['String']['input']>;
    orderId?: InputMaybe<Scalars['String']['input']>;
    paymentIntentId?: InputMaybe<Scalars['String']['input']>;
    paymentMethod?: InputMaybe<Scalars['String']['input']>;
    paymentMethodId?: InputMaybe<Scalars['String']['input']>;
    stripe?: InputMaybe<Scalars['String']['input']>;
    subscriptionId?: InputMaybe<Scalars['String']['input']>;
};

export type SubscriptionContract = {
    __typename?: 'SubscriptionContract';
    addresses?: Maybe<Array<SubscriptionContractAddress>>;
    createdAt: Scalars['DateTime']['output'];
    customer?: Maybe<Customer>;
    customerIdentifier: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    initial?: Maybe<SubscriptionContractPhase>;
    item: SubscriptionContractItem;
    payment?: Maybe<Payment>;
    recurring?: Maybe<SubscriptionContractPhase>;
    status: SubscriptionContractStatus;
    subscriptionPlan?: Maybe<SubscriptionPlan>;
    tenant: Tenant;
    tenantId: Scalars['ID']['output'];
    updatedAt: Scalars['DateTime']['output'];
    usage?: Maybe<Array<SubscriptionContractUsage>>;
};

export type SubscriptionContractUsageArgs = {
    end: Scalars['DateTime']['input'];
    start: Scalars['DateTime']['input'];
};

export type SubscriptionContractAddress = {
    __typename?: 'SubscriptionContractAddress';
    city?: Maybe<Scalars['String']['output']>;
    country?: Maybe<Scalars['String']['output']>;
    email?: Maybe<Scalars['EmailAddress']['output']>;
    firstName?: Maybe<Scalars['String']['output']>;
    id?: Maybe<Scalars['String']['output']>;
    lastName?: Maybe<Scalars['String']['output']>;
    middleName?: Maybe<Scalars['String']['output']>;
    phone?: Maybe<Scalars['String']['output']>;
    postalCode?: Maybe<Scalars['String']['output']>;
    state?: Maybe<Scalars['String']['output']>;
    street?: Maybe<Scalars['String']['output']>;
    street2?: Maybe<Scalars['String']['output']>;
    streetNumber?: Maybe<Scalars['String']['output']>;
    type: AddressType;
};

export type SubscriptionContractCancelledEvent = SubscriptionContractEvent & {
    __typename?: 'SubscriptionContractCancelledEvent';
    createdAt: Scalars['DateTime']['output'];
    id: Scalars['ID']['output'];
    type: SubscriptionContractEventType;
};

export type SubscriptionContractConnection = {
    __typename?: 'SubscriptionContractConnection';
    edges?: Maybe<Array<SubscriptionContractConnectionEdge>>;
    pageInfo: PageInfo;
};

export type SubscriptionContractConnectionEdge = {
    __typename?: 'SubscriptionContractConnectionEdge';
    cursor: Scalars['String']['output'];
    node: SubscriptionContract;
};

export type SubscriptionContractEvent = {
    createdAt: Scalars['DateTime']['output'];
    id: Scalars['ID']['output'];
    type: SubscriptionContractEventType;
};

export type SubscriptionContractEventConnection = {
    __typename?: 'SubscriptionContractEventConnection';
    edges?: Maybe<Array<SubscriptionContractEventConnectionEdge>>;
    pageInfo: PageInfo;
};

export type SubscriptionContractEventConnectionEdge = {
    __typename?: 'SubscriptionContractEventConnectionEdge';
    cursor: Scalars['String']['output'];
    node: SubscriptionContractEvent;
};

export type SubscriptionContractEventQueries = {
    __typename?: 'SubscriptionContractEventQueries';
    getMany?: Maybe<SubscriptionContractEventConnection>;
};

export type SubscriptionContractEventQueriesGetManyArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    eventTypes?: InputMaybe<Array<SubscriptionContractEventType>>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<SortDirection>;
    subscriptionContractId: Scalars['ID']['input'];
    tenantId: Scalars['ID']['input'];
};

export enum SubscriptionContractEventSortField {
    Id = '_id',
}

export enum SubscriptionContractEventType {
    Cancelled = 'cancelled',
    RenewalDueBroadcast = 'renewalDueBroadcast',
    Renewed = 'renewed',
    UsageTracked = 'usageTracked',
}

export type SubscriptionContractItem = {
    __typename?: 'SubscriptionContractItem';
    imageUrl?: Maybe<Scalars['String']['output']>;
    meta?: Maybe<Array<KeyValuePair>>;
    name: Scalars['String']['output'];
    sku: Scalars['String']['output'];
};

export type SubscriptionContractMeteredVariableReference = {
    __typename?: 'SubscriptionContractMeteredVariableReference';
    id: Scalars['ID']['output'];
    tierType?: Maybe<TierType>;
    tiers: Array<SubscriptionContractMeteredVariableTierReference>;
};

export type SubscriptionContractMeteredVariableTierReference = {
    __typename?: 'SubscriptionContractMeteredVariableTierReference';
    currency: Scalars['String']['output'];
    price?: Maybe<Scalars['Float']['output']>;
    threshold: Scalars['Int']['output'];
};

export type SubscriptionContractMutations = {
    __typename?: 'SubscriptionContractMutations';
    cancel: SubscriptionContract;
    create: SubscriptionContract;
    delete?: Maybe<Scalars['Int']['output']>;
    renew: SubscriptionContract;
    trackUsage: SubscriptionContractUsageTrackedEvent;
    update: SubscriptionContract;
};

export type SubscriptionContractMutationsCancelArgs = {
    deactivate?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
};

export type SubscriptionContractMutationsCreateArgs = {
    input: CreateSubscriptionContractInput;
};

export type SubscriptionContractMutationsDeleteArgs = {
    id: Scalars['ID']['input'];
};

export type SubscriptionContractMutationsRenewArgs = {
    id: Scalars['ID']['input'];
};

export type SubscriptionContractMutationsTrackUsageArgs = {
    id: Scalars['ID']['input'];
    input: TrackUsageInput;
};

export type SubscriptionContractMutationsUpdateArgs = {
    id: Scalars['ID']['input'];
    input: UpdateSubscriptionContractInput;
};

export type SubscriptionContractPhase = {
    __typename?: 'SubscriptionContractPhase';
    currency: Scalars['String']['output'];
    meteredVariables?: Maybe<Array<SubscriptionContractMeteredVariableReference>>;
    period: Scalars['Int']['output'];
    price: Scalars['Float']['output'];
    unit: SubscriptionPeriodUnit;
};

export type SubscriptionContractQueries = {
    __typename?: 'SubscriptionContractQueries';
    get?: Maybe<SubscriptionContract>;
    getMany?: Maybe<SubscriptionContractConnection>;
};

export type SubscriptionContractQueriesGetArgs = {
    id: Scalars['ID']['input'];
};

export type SubscriptionContractQueriesGetManyArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    customerIdentifier?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<SortDirection>;
    sortField?: InputMaybe<SubscriptionContractSortField>;
    tenantId: Scalars['ID']['input'];
};

export type SubscriptionContractRenewalDueBroadcastEvent = SubscriptionContractEvent & {
    __typename?: 'SubscriptionContractRenewalDueBroadcastEvent';
    createdAt: Scalars['DateTime']['output'];
    data: SubscriptionContractRenewalDueBroadcastEventData;
    id: Scalars['ID']['output'];
    type: SubscriptionContractEventType;
};

export type SubscriptionContractRenewalDueBroadcastEventData = {
    __typename?: 'SubscriptionContractRenewalDueBroadcastEventData';
    broadcastAt: Scalars['DateTime']['output'];
    renewAt: Scalars['DateTime']['output'];
};

export type SubscriptionContractRenewedEvent = SubscriptionContractEvent & {
    __typename?: 'SubscriptionContractRenewedEvent';
    createdAt: Scalars['DateTime']['output'];
    id: Scalars['ID']['output'];
    type: SubscriptionContractEventType;
};

export enum SubscriptionContractSortField {
    Id = '_id',
    UpdatedAt = 'updatedAt',
}

export type SubscriptionContractStatus = {
    __typename?: 'SubscriptionContractStatus';
    activeUntil?: Maybe<Scalars['DateTime']['output']>;
    currency: Scalars['String']['output'];
    price: Scalars['Float']['output'];
    renewAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SubscriptionContractUsage = {
    __typename?: 'SubscriptionContractUsage';
    meteredVariableId: Scalars['ID']['output'];
    quantity?: Maybe<Scalars['Float']['output']>;
};

export type SubscriptionContractUsageTrackedData = {
    __typename?: 'SubscriptionContractUsageTrackedData';
    description?: Maybe<Scalars['String']['output']>;
    idempotencyKey?: Maybe<Scalars['String']['output']>;
    meteredVariableId: Scalars['ID']['output'];
    quantity: Scalars['Float']['output'];
};

export type SubscriptionContractUsageTrackedEvent = SubscriptionContractEvent & {
    __typename?: 'SubscriptionContractUsageTrackedEvent';
    createdAt: Scalars['DateTime']['output'];
    data?: Maybe<SubscriptionContractUsageTrackedData>;
    id: Scalars['ID']['output'];
    type: SubscriptionContractEventType;
};

export enum SubscriptionPeriodUnit {
    Day = 'day',
    Month = 'month',
    Week = 'week',
    Year = 'year',
}

export type SubscriptionPlan = {
    __typename?: 'SubscriptionPlan';
    createdAt: Scalars['DateTime']['output'];
    identifier: Scalars['String']['output'];
    meteredVariables?: Maybe<Array<SubscriptionPlanMeteredVariable>>;
    name?: Maybe<Scalars['String']['output']>;
    periods?: Maybe<Array<SubscriptionPlanPeriod>>;
    tenant: Tenant;
    tenantId: Scalars['ID']['output'];
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SubscriptionPlanMeteredVariable = {
    __typename?: 'SubscriptionPlanMeteredVariable';
    id: Scalars['ID']['output'];
    identifier: Scalars['String']['output'];
    name?: Maybe<Scalars['String']['output']>;
    unit: Scalars['String']['output'];
};

export type SubscriptionPlanMeteredVariableInput = {
    id?: InputMaybe<Scalars['ID']['input']>;
    identifier: Scalars['String']['input'];
    name?: InputMaybe<Scalars['String']['input']>;
    unit: Scalars['String']['input'];
};

export type SubscriptionPlanMeteredVariableReferenceInput = {
    id: Scalars['ID']['input'];
    tierType?: InputMaybe<TierType>;
    tiers?: InputMaybe<Array<SubscriptionPlanMeteredVariableTierReferenceInput>>;
};

export type SubscriptionPlanMeteredVariableTierReferenceInput = {
    price?: InputMaybe<Scalars['Float']['input']>;
    priceVariants?: InputMaybe<Array<PriceVariantReferenceInput>>;
    threshold: Scalars['Int']['input'];
};

export type SubscriptionPlanMutations = {
    __typename?: 'SubscriptionPlanMutations';
    create: SubscriptionPlan;
    delete: Scalars['Int']['output'];
    update: SubscriptionPlan;
};

export type SubscriptionPlanMutationsCreateArgs = {
    input: CreateSubscriptionPlanInput;
};

export type SubscriptionPlanMutationsDeleteArgs = {
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type SubscriptionPlanMutationsUpdateArgs = {
    identifier: Scalars['String']['input'];
    input: UpdateSubscriptionPlanInput;
    tenantId: Scalars['ID']['input'];
};

export type SubscriptionPlanPeriod = {
    __typename?: 'SubscriptionPlanPeriod';
    id: Scalars['ID']['output'];
    initial?: Maybe<SubscriptionPlanPhase>;
    name: Scalars['String']['output'];
    recurring: SubscriptionPlanPhase;
};

export type SubscriptionPlanPeriodInput = {
    id?: InputMaybe<Scalars['ID']['input']>;
    initial?: InputMaybe<SubscriptionPlanPhaseInput>;
    name: Scalars['String']['input'];
    recurring: SubscriptionPlanPhaseInput;
};

export type SubscriptionPlanPeriodReferenceInput = {
    id: Scalars['ID']['input'];
    initial?: InputMaybe<SubscriptionPlanPriceInput>;
    recurring: SubscriptionPlanPriceInput;
};

export type SubscriptionPlanPhase = {
    __typename?: 'SubscriptionPlanPhase';
    period: Scalars['Int']['output'];
    unit: SubscriptionPeriodUnit;
};

export type SubscriptionPlanPhaseInput = {
    period: Scalars['Int']['input'];
    unit: SubscriptionPeriodUnit;
};

export type SubscriptionPlanPriceInput = {
    meteredVariables?: InputMaybe<Array<SubscriptionPlanMeteredVariableReferenceInput>>;
    price?: InputMaybe<Scalars['Float']['input']>;
    priceVariants?: InputMaybe<Array<PriceVariantReferenceInput>>;
};

export type SubscriptionPlanQueries = {
    __typename?: 'SubscriptionPlanQueries';
    get?: Maybe<SubscriptionPlan>;
    getMany?: Maybe<Array<SubscriptionPlan>>;
};

export type SubscriptionPlanQueriesGetArgs = {
    identifier: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type SubscriptionPlanQueriesGetManyArgs = {
    tenantId: Scalars['ID']['input'];
};

export type SubscriptionPlanReferenceInput = {
    identifier: Scalars['String']['input'];
    periods: Array<SubscriptionPlanPeriodReferenceInput>;
};

export type SuggestSearchAggregations = {
    __typename?: 'SuggestSearchAggregations';
    totalResults: Scalars['Int']['output'];
    typesAggregation: Array<SuggestSearchTypesAggregation>;
};

export type SuggestSearchConnection = {
    __typename?: 'SuggestSearchConnection';
    aggregations: SuggestSearchAggregations;
    edges?: Maybe<Array<SuggestSearchConnectionEdge>>;
    pageInfo: PageInfo;
};

export type SuggestSearchConnectionEdge = {
    __typename?: 'SuggestSearchConnectionEdge';
    cursor: Scalars['String']['output'];
    node: SuggestSearchResult;
};

export enum SuggestSearchItemType {
    Document = 'DOCUMENT',
    Folder = 'FOLDER',
    Grid = 'GRID',
    Pipeline = 'PIPELINE',
    Product = 'PRODUCT',
    Shape = 'SHAPE',
    Topic = 'TOPIC',
    Webhook = 'WEBHOOK',
}

export type SuggestSearchResult = {
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    path: Scalars['String']['output'];
    tenantId: Scalars['ID']['output'];
    type: Scalars['String']['output'];
};

export type SuggestSearchTypesAggregation = {
    __typename?: 'SuggestSearchTypesAggregation';
    count: Scalars['Int']['output'];
    type: Scalars['String']['output'];
};

export type Tax = {
    __typename?: 'Tax';
    name?: Maybe<Scalars['String']['output']>;
    percent?: Maybe<Scalars['Float']['output']>;
};

export type TaxInput = {
    name?: InputMaybe<Scalars['String']['input']>;
    percent?: InputMaybe<Scalars['Float']['input']>;
};

export type Tenant = {
    __typename?: 'Tenant';
    authenticationMethod?: Maybe<TenantAuthenticationMethod>;
    availableLanguages?: Maybe<Array<Language>>;
    copiedFrom?: Maybe<TenantCopySource>;
    createdAt: Scalars['DateTime']['output'];
    defaults: TenantDefaults;
    grids?: Maybe<Array<Grid>>;
    id: Scalars['ID']['output'];
    identifier: Scalars['String']['output'];
    isActive: Scalars['Boolean']['output'];
    isTrial: Scalars['Boolean']['output'];
    logo?: Maybe<Image>;
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']['output']>;
    metrics?: Maybe<TenantMetrics>;
    name: Scalars['String']['output'];
    preferences?: Maybe<TenantPreferences>;
    rootItemId: Scalars['ID']['output'];
    shapes?: Maybe<Array<Shape>>;
    /** Empty string for non-admin users. */
    signatureSecret: Scalars['String']['output'];
    /** Empty string for non-admin users. */
    staticAuthToken?: Maybe<Scalars['String']['output']>;
    topics?: Maybe<Array<Topic>>;
    tree?: Maybe<Array<TreeNode>>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
    users?: Maybe<Array<UserTenantRole>>;
    vatTypes?: Maybe<Array<VatType>>;
    webhooks?: Maybe<Array<Webhook>>;
};

export type TenantGridsArgs = {
    language: Scalars['String']['input'];
    versionLabel?: VersionLabel;
};

export type TenantMetaPropertyArgs = {
    key: Scalars['String']['input'];
};

export type TenantTopicsArgs = {
    language: Scalars['String']['input'];
};

export type TenantTreeArgs = {
    versionLabel?: InputMaybe<VersionLabel>;
};

export type TenantWebhooksArgs = {
    concern?: InputMaybe<Scalars['String']['input']>;
    event?: InputMaybe<Scalars['String']['input']>;
};

export type TenantAuthenticationMethod = {
    __typename?: 'TenantAuthenticationMethod';
    catalogue?: Maybe<AuthenticationMethod>;
    search?: Maybe<AuthenticationMethod>;
};

export type TenantAuthenticationMethodInput = {
    catalogue?: InputMaybe<AuthenticationMethod>;
    search?: InputMaybe<AuthenticationMethod>;
};

export enum TenantCopyExcludeableTypes {
    Assets = 'assets',
    Customers = 'customers',
    Orders = 'orders',
    Users = 'users',
    Webhooks = 'webhooks',
}

export type TenantCopySource = {
    __typename?: 'TenantCopySource';
    date: Scalars['DateTime']['output'];
    id: Scalars['ID']['output'];
    identifier: Scalars['String']['output'];
};

export type TenantDefaults = {
    __typename?: 'TenantDefaults';
    currency: Scalars['String']['output'];
    language: Scalars['String']['output'];
};

export type TenantDefaultsInput = {
    currency?: InputMaybe<Scalars['String']['input']>;
    language?: InputMaybe<Scalars['String']['input']>;
};

export type TenantFrontend = {
    __typename?: 'TenantFrontend';
    /** @deprecated authentication property has been deprecated */
    authentication?: Maybe<TenantFrontendAuthentication>;
    name: Scalars['String']['output'];
    /** @deprecated responsive property has been deprecated */
    responsive?: Maybe<Scalars['Boolean']['output']>;
    url: Scalars['String']['output'];
};

export type TenantFrontendAuthentication = {
    __typename?: 'TenantFrontendAuthentication';
    key: Scalars['String']['output'];
    value: Scalars['String']['output'];
};

export type TenantFrontendAuthenticationInput = {
    key: Scalars['String']['input'];
    value: Scalars['String']['input'];
};

export type TenantFrontendInput = {
    name: Scalars['String']['input'];
    url: Scalars['String']['input'];
};

export type TenantMetrics = {
    __typename?: 'TenantMetrics';
    apiCalls: ApiCallMetrics;
    bandwidth: BandwidthUsageMetrics;
    items: ItemMetrics;
    orders: OrderMetrics;
    shapes: ShapeMetrics;
    users: UserMetrics;
    webhooks: WebhookMetrics;
};

export type TenantMutations = {
    __typename?: 'TenantMutations';
    addUsers: Array<UserTenantRole>;
    create: Tenant;
    createCopyTask: BulkTaskTenantCopyInfo;
    delete: Scalars['Int']['output'];
    regenerateSecrets: Tenant;
    /** @deprecated Replaced by regenerateSecrets */
    regenerateStaticAuthToken: Tenant;
    removeUsers?: Maybe<Array<UserTenantRole>>;
    setAuthenticationMethod: Tenant;
    setPreferences: TenantPreferences;
    update: Tenant;
};

export type TenantMutationsAddUsersArgs = {
    roles: Array<UserRoleInput>;
    tenantId: Scalars['ID']['input'];
};

export type TenantMutationsCreateArgs = {
    input: CreateTenantInput;
};

export type TenantMutationsCreateCopyTaskArgs = {
    desiredIdentifier: Scalars['String']['input'];
    desiredName?: InputMaybe<Scalars['String']['input']>;
    exclude?: InputMaybe<Array<TenantCopyExcludeableTypes>>;
    overwrite?: InputMaybe<Scalars['Boolean']['input']>;
    tenantId: Scalars['ID']['input'];
};

export type TenantMutationsDeleteArgs = {
    id: Scalars['ID']['input'];
};

export type TenantMutationsRegenerateSecretsArgs = {
    input?: InputMaybe<RegenerateSecretsInput>;
    tenantId: Scalars['ID']['input'];
};

export type TenantMutationsRegenerateStaticAuthTokenArgs = {
    tenantId: Scalars['ID']['input'];
};

export type TenantMutationsRemoveUsersArgs = {
    tenantId: Scalars['ID']['input'];
    userIds: Array<Scalars['ID']['input']>;
};

export type TenantMutationsSetAuthenticationMethodArgs = {
    input?: InputMaybe<TenantAuthenticationMethodInput>;
    tenantId: Scalars['ID']['input'];
};

export type TenantMutationsSetPreferencesArgs = {
    input: TenantPreferencesInput;
    tenantId: Scalars['ID']['input'];
};

export type TenantMutationsUpdateArgs = {
    id: Scalars['ID']['input'];
    input: UpdateTenantInput;
};

export type TenantPreferences = {
    __typename?: 'TenantPreferences';
    frontends?: Maybe<Array<Maybe<TenantFrontend>>>;
};

export type TenantPreferencesInput = {
    frontends?: InputMaybe<Array<TenantFrontendInput>>;
};

export type TenantQueries = {
    __typename?: 'TenantQueries';
    get?: Maybe<Tenant>;
    getMany?: Maybe<Array<Tenant>>;
    getRootTopics?: Maybe<Array<Maybe<Topic>>>;
    suggestIdentifier: IdentifierSuggestion;
};

export type TenantQueriesGetArgs = {
    id?: InputMaybe<Scalars['ID']['input']>;
    identifier?: InputMaybe<Scalars['String']['input']>;
};

export type TenantQueriesGetManyArgs = {
    identifier?: InputMaybe<Scalars['String']['input']>;
};

export type TenantQueriesGetRootTopicsArgs = {
    language: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type TenantQueriesSuggestIdentifierArgs = {
    desired: Scalars['String']['input'];
};

export type TenantReports = {
    __typename?: 'TenantReports';
    orders: OrdersReport;
    sales: SalesReport;
};

export type TenantReportsOrdersArgs = {
    currency: Scalars['String']['input'];
    end?: InputMaybe<Scalars['DateTime']['input']>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
    tenantId: Scalars['ID']['input'];
};

export type TenantReportsSalesArgs = {
    currency: Scalars['String']['input'];
    end?: InputMaybe<Scalars['DateTime']['input']>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
    tenantId: Scalars['ID']['input'];
};

export type TenantRoleInput = {
    role: UserRole;
    tenantId: Scalars['ID']['input'];
};

export enum TierType {
    Graduated = 'graduated',
    Volume = 'volume',
}

export type Topic = {
    __typename?: 'Topic';
    ancestors?: Maybe<Array<Topic>>;
    childCount: Scalars['Int']['output'];
    children?: Maybe<Array<Topic>>;
    createdAt: Scalars['DateTime']['output'];
    descendants?: Maybe<Array<Topic>>;
    id: Scalars['ID']['output'];
    items?: Maybe<Array<Item>>;
    language?: Maybe<Scalars['String']['output']>;
    name?: Maybe<Scalars['String']['output']>;
    parent?: Maybe<Topic>;
    parentId?: Maybe<Scalars['ID']['output']>;
    path: Scalars['String']['output'];
    tenant: Tenant;
    tenantId: Scalars['ID']['output'];
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TopicConnection = {
    __typename?: 'TopicConnection';
    edges?: Maybe<Array<TopicConnectionEdge>>;
    pageInfo: PageInfo;
};

export type TopicConnectionEdge = {
    __typename?: 'TopicConnectionEdge';
    cursor: Scalars['String']['output'];
    node: Topic;
};

export type TopicImagesModified = {
    __typename?: 'TopicImagesModified';
    modified?: Maybe<Scalars['Int']['output']>;
};

export type TopicItemsModified = {
    __typename?: 'TopicItemsModified';
    modified?: Maybe<Scalars['Int']['output']>;
};

export type TopicMutations = {
    __typename?: 'TopicMutations';
    addImages: TopicImagesModified;
    addItems: TopicItemsModified;
    bulkCreate: Array<Topic>;
    create: Topic;
    delete: Scalars['Int']['output'];
    removeImages: TopicImagesModified;
    removeItems: TopicItemsModified;
    update: Topic;
};

export type TopicMutationsAddImagesArgs = {
    imageKeys: Array<Scalars['String']['input']>;
    topicId: Scalars['ID']['input'];
};

export type TopicMutationsAddItemsArgs = {
    itemIds: Array<Scalars['ID']['input']>;
    topicId: Scalars['ID']['input'];
};

export type TopicMutationsBulkCreateArgs = {
    input: Array<BulkCreateTopicInput>;
    language: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type TopicMutationsCreateArgs = {
    input: CreateTopicInput;
    language: Scalars['String']['input'];
};

export type TopicMutationsDeleteArgs = {
    id: Scalars['ID']['input'];
};

export type TopicMutationsRemoveImagesArgs = {
    imageKeys: Array<Scalars['String']['input']>;
    topicId: Scalars['ID']['input'];
};

export type TopicMutationsRemoveItemsArgs = {
    itemIds: Array<Scalars['ID']['input']>;
    topicId: Scalars['ID']['input'];
};

export type TopicMutationsUpdateArgs = {
    id: Scalars['ID']['input'];
    input: UpdateTopicInput;
    language: Scalars['String']['input'];
};

export type TopicQueries = {
    __typename?: 'TopicQueries';
    /** Returns a specific topic. Topics can be queried either by ID or by path. */
    get?: Maybe<Topic>;
    getRootTopics?: Maybe<Array<Maybe<Topic>>>;
};

export type TopicQueriesGetArgs = {
    id?: InputMaybe<Scalars['ID']['input']>;
    language: Scalars['String']['input'];
    path?: InputMaybe<GetTopicByPathArguments>;
};

export type TopicQueriesGetRootTopicsArgs = {
    language: Scalars['String']['input'];
    tenantId: Scalars['ID']['input'];
};

export type TopicSearchAggregations = {
    __typename?: 'TopicSearchAggregations';
    totalResults: Scalars['Int']['output'];
};

export type TopicSearchConnection = {
    __typename?: 'TopicSearchConnection';
    aggregations: TopicSearchAggregations;
    edges?: Maybe<Array<TopicSearchConnectionEdge>>;
};

export type TopicSearchConnectionEdge = {
    __typename?: 'TopicSearchConnectionEdge';
    node: TopicSearchResult;
};

export type TopicSearchResult = {
    __typename?: 'TopicSearchResult';
    display: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    language: Scalars['String']['output'];
    name: Scalars['String']['output'];
    path: Scalars['String']['output'];
    tenantId: Scalars['ID']['output'];
};

export type TrackUsageInput = {
    description?: InputMaybe<Scalars['String']['input']>;
    idempotencyKey?: InputMaybe<Scalars['String']['input']>;
    meteredVariableId: Scalars['ID']['input'];
    quantity: Scalars['Float']['input'];
};

export type TreeMutations = {
    __typename?: 'TreeMutations';
    createNode: TreeNode;
    deleteNode: Scalars['Int']['output'];
    moveNode: TreeNode;
};

export type TreeMutationsCreateNodeArgs = {
    input: FullTreeNodeInput;
};

export type TreeMutationsDeleteNodeArgs = {
    itemId: Scalars['ID']['input'];
};

export type TreeMutationsMoveNodeArgs = {
    input: TreeNodeInput;
    itemId: Scalars['ID']['input'];
};

export type TreeNode = {
    __typename?: 'TreeNode';
    aliases?: Maybe<Array<Scalars['String']['output']>>;
    ancestors?: Maybe<Array<TreeNode>>;
    childCount?: Maybe<Scalars['Int']['output']>;
    children?: Maybe<Array<TreeNode>>;
    history?: Maybe<Array<Scalars['String']['output']>>;
    identifiers?: Maybe<Array<TreeNodeIdentifier>>;
    item?: Maybe<Item>;
    itemId: Scalars['ID']['output'];
    language?: Maybe<Scalars['String']['output']>;
    parent?: Maybe<TreeNode>;
    parentId?: Maybe<Scalars['ID']['output']>;
    path?: Maybe<Scalars['String']['output']>;
    pathResolutionMethod?: Maybe<PathResolutionMethod>;
    position?: Maybe<Scalars['PositiveInt']['output']>;
    shortcuts?: Maybe<Array<Shortcut>>;
    siblings?: Maybe<Array<TreeNode>>;
    versionLabel: VersionLabel;
};

export type TreeNodeItemArgs = {
    language?: InputMaybe<Scalars['String']['input']>;
};

export type TreeNodePathArgs = {
    language?: InputMaybe<Scalars['String']['input']>;
};

export type TreeNodeIdentifier = {
    __typename?: 'TreeNodeIdentifier';
    identifier: Scalars['String']['output'];
    language: Scalars['String']['output'];
};

export type TreeNodeIdentifierInput = {
    identifier: Scalars['String']['input'];
    language: Scalars['String']['input'];
};

export type TreeNodeInput = {
    parentId: Scalars['ID']['input'];
    position?: InputMaybe<Scalars['PositiveInt']['input']>;
};

export type TreeQueries = {
    __typename?: 'TreeQueries';
    getNode?: Maybe<TreeNode>;
};

export type TreeQueriesGetNodeArgs = {
    itemId: Scalars['ID']['input'];
    language?: InputMaybe<Scalars['String']['input']>;
    versionLabel?: VersionLabel;
};

export type UpdateAppInput = {
    baseUrl?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerAddressInput = {
    city?: InputMaybe<Scalars['String']['input']>;
    country?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['EmailAddress']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    middleName?: InputMaybe<Scalars['String']['input']>;
    phone?: InputMaybe<Scalars['String']['input']>;
    postalCode?: InputMaybe<Scalars['String']['input']>;
    state?: InputMaybe<Scalars['String']['input']>;
    street?: InputMaybe<Scalars['String']['input']>;
    street2?: InputMaybe<Scalars['String']['input']>;
    streetNumber?: InputMaybe<Scalars['String']['input']>;
    type?: InputMaybe<AddressType>;
};

export type UpdateCustomerInput = {
    addresses?: InputMaybe<Array<CreateCustomerAddressInput>>;
    birthDate?: InputMaybe<Scalars['Date']['input']>;
    companyName?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    externalReferences?: InputMaybe<Array<KeyValuePairInput>>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    middleName?: InputMaybe<Scalars['String']['input']>;
    phone?: InputMaybe<Scalars['String']['input']>;
    taxNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDocumentInput = {
    components?: InputMaybe<Array<ComponentInput>>;
    createdAt?: InputMaybe<Scalars['DateTime']['input']>;
    externalReference?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
    topicIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateFolderInput = {
    components?: InputMaybe<Array<ComponentInput>>;
    createdAt?: InputMaybe<Scalars['DateTime']['input']>;
    externalReference?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
    topicIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateGridInput = {
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    name?: InputMaybe<Scalars['String']['input']>;
    rows?: InputMaybe<Array<GridRowInput>>;
};

export type UpdateImageInput = {
    altText?: InputMaybe<Scalars['String']['input']>;
    caption?: InputMaybe<RichTextContentInput>;
    focalPoint?: InputMaybe<FocalPointInput>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    showcase?: InputMaybe<Array<ImageHotspotInput>>;
};

export type UpdateLanguageInput = {
    name: Scalars['String']['input'];
};

export type UpdateMarketInput = {
    customerIdentifiers?: InputMaybe<Array<Scalars['String']['input']>>;
    name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrderInput = {
    additionalInformation?: InputMaybe<Scalars['String']['input']>;
    cart?: InputMaybe<Array<OrderItemInput>>;
    customer?: InputMaybe<CustomerInput>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    payment?: InputMaybe<Array<PaymentInput>>;
    total?: InputMaybe<PriceInput>;
};

export type UpdatePipelineInput = {
    name: Scalars['String']['input'];
};

export type UpdatePipelineStageInput = {
    name?: InputMaybe<Scalars['String']['input']>;
    placeNewOrders?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdatePriceListInput = {
    endDate?: InputMaybe<Scalars['DateTime']['input']>;
    modifierType?: InputMaybe<PriceListModifierType>;
    name?: InputMaybe<Scalars['String']['input']>;
    priceVariants?: InputMaybe<Array<PriceListPriceVariantReferenceInput>>;
    selectedProductVariants?: InputMaybe<CreatePriceListSelectedProductVariantsInput>;
    startDate?: InputMaybe<Scalars['DateTime']['input']>;
    targetAudience?: InputMaybe<CreatePriceListTargetAudienceInput>;
};

export type UpdatePriceVariantInput = {
    currency?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
    components?: InputMaybe<Array<ComponentInput>>;
    createdAt?: InputMaybe<Scalars['DateTime']['input']>;
    externalReference?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
    topicIds?: InputMaybe<Array<Scalars['ID']['input']>>;
    variants?: InputMaybe<Array<UpdateProductVariantInput>>;
    vatTypeId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateProductSubscriptionInput = {
    addresses?: InputMaybe<Array<CreateProductSubscriptionAddressInput>>;
    initial?: InputMaybe<UpdateProductSubscriptionPhaseInput>;
    item?: InputMaybe<UpdateProductSubscriptionItemInput>;
    payment?: InputMaybe<PaymentInput>;
    recurring?: InputMaybe<UpdateProductSubscriptionPhaseInput>;
    status?: InputMaybe<UpdateProductSubscriptionStatusInput>;
};

export type UpdateProductSubscriptionItemInput = {
    imageUrl?: InputMaybe<Scalars['String']['input']>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    name?: InputMaybe<Scalars['String']['input']>;
    quantity?: InputMaybe<Scalars['NonNegativeInt']['input']>;
    sku?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductSubscriptionPhaseInput = {
    currency?: InputMaybe<Scalars['String']['input']>;
    price?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateProductSubscriptionStatusInput = {
    activeUntil?: InputMaybe<Scalars['DateTime']['input']>;
    currency?: InputMaybe<Scalars['String']['input']>;
    price?: InputMaybe<Scalars['Float']['input']>;
    renewAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateProductVariantInput = {
    attributes?: InputMaybe<Array<ProductVariantAttributeInput>>;
    components?: InputMaybe<Array<ComponentInput>>;
    externalReference?: InputMaybe<Scalars['String']['input']>;
    id?: InputMaybe<Scalars['String']['input']>;
    images?: InputMaybe<Array<ImageInput>>;
    isDefault?: InputMaybe<Scalars['Boolean']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
    price?: InputMaybe<Scalars['Float']['input']>;
    priceVariants?: InputMaybe<Array<PriceVariantReferenceInput>>;
    sku?: InputMaybe<Scalars['String']['input']>;
    stock?: InputMaybe<Scalars['Int']['input']>;
    stockLocations?: InputMaybe<Array<StockLocationReferenceInput>>;
    subscriptionPlans?: InputMaybe<Array<SubscriptionPlanReferenceInput>>;
    videos?: InputMaybe<Array<VideoInput>>;
};

export type UpdateShapeInput = {
    components?: InputMaybe<Array<ShapeComponentInput>>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    name?: InputMaybe<Scalars['String']['input']>;
    variantComponents?: InputMaybe<Array<ShapeComponentInput>>;
};

export type UpdateSingleProductVariantInput = {
    attributes?: InputMaybe<Array<ProductVariantAttributeInput>>;
    components?: InputMaybe<Array<ComponentInput>>;
    externalReference?: InputMaybe<Scalars['String']['input']>;
    images?: InputMaybe<Array<ImageInput>>;
    name?: InputMaybe<Scalars['String']['input']>;
    price?: InputMaybe<Scalars['Float']['input']>;
    priceVariants?: InputMaybe<Array<PriceVariantReferenceInput>>;
    sku?: InputMaybe<Scalars['String']['input']>;
    stock?: InputMaybe<Scalars['Int']['input']>;
    stockLocations?: InputMaybe<Array<StockLocationReferenceInput>>;
    subscriptionPlans?: InputMaybe<Array<SubscriptionPlanReferenceInput>>;
    videos?: InputMaybe<Array<VideoInput>>;
};

export type UpdateStockLocationInput = {
    name?: InputMaybe<Scalars['String']['input']>;
    settings?: InputMaybe<StockLocationSettingsInput>;
};

export type UpdateSubscriptionContractInput = {
    addresses?: InputMaybe<Array<CreateSubscriptionContractAddressInput>>;
    initial?: InputMaybe<UpdateSubscriptionContractPhaseInput>;
    item?: InputMaybe<UpdateSubscriptionContractItemInput>;
    payment?: InputMaybe<PaymentInput>;
    recurring?: InputMaybe<UpdateSubscriptionContractPhaseInput>;
    status?: InputMaybe<UpdateSubscriptionContractStatusInput>;
};

export type UpdateSubscriptionContractItemInput = {
    imageUrl?: InputMaybe<Scalars['String']['input']>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    name?: InputMaybe<Scalars['String']['input']>;
    quantity?: InputMaybe<Scalars['NonNegativeInt']['input']>;
    sku?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSubscriptionContractPhaseInput = {
    currency?: InputMaybe<Scalars['String']['input']>;
    meteredVariables?: InputMaybe<Array<CreateSubscriptionContractMeteredVariableReferenceInput>>;
    price?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateSubscriptionContractStatusInput = {
    activeUntil?: InputMaybe<Scalars['DateTime']['input']>;
    currency?: InputMaybe<Scalars['String']['input']>;
    price?: InputMaybe<Scalars['Float']['input']>;
    renewAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateSubscriptionPlanInput = {
    meteredVariables?: InputMaybe<Array<SubscriptionPlanMeteredVariableInput>>;
    name?: InputMaybe<Scalars['String']['input']>;
    periods?: InputMaybe<Array<SubscriptionPlanPeriodInput>>;
};

export type UpdateTenantInput = {
    defaults?: InputMaybe<TenantDefaultsInput>;
    isActive?: InputMaybe<Scalars['Boolean']['input']>;
    isTrial?: InputMaybe<Scalars['Boolean']['input']>;
    logo?: InputMaybe<ImageInput>;
    meta?: InputMaybe<Array<KeyValuePairInput>>;
    name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTopicInput = {
    name?: InputMaybe<Scalars['String']['input']>;
    parentId?: InputMaybe<Scalars['ID']['input']>;
    pathIdentifier?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
    companyName?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    marketingEmailConsentedAt?: InputMaybe<Scalars['DateTime']['input']>;
    tocReadAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateVatTypeInput = {
    name?: InputMaybe<Scalars['String']['input']>;
    percent?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateWebhookInput = {
    concern?: InputMaybe<Scalars['String']['input']>;
    event?: InputMaybe<Scalars['String']['input']>;
    graphqlQuery?: InputMaybe<Scalars['String']['input']>;
    headers?: InputMaybe<Array<WebhookHeaderInput>>;
    method?: InputMaybe<HttpMethod>;
    name?: InputMaybe<Scalars['String']['input']>;
    url?: InputMaybe<Scalars['String']['input']>;
};

export type UploadField = {
    __typename?: 'UploadField';
    name: Scalars['String']['output'];
    value: Scalars['String']['output'];
};

export type User = {
    __typename?: 'User';
    accessTokens?: Maybe<Array<AccessToken>>;
    companyName?: Maybe<Scalars['String']['output']>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    email?: Maybe<Scalars['String']['output']>;
    firstName?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    isAdmin: Scalars['Boolean']['output'];
    lastName?: Maybe<Scalars['String']['output']>;
    lastSeenAt?: Maybe<Scalars['DateTime']['output']>;
    marketingEmailConsentedAt?: Maybe<Scalars['DateTime']['output']>;
    preferences?: Maybe<Preferences>;
    role?: Maybe<UserTenantRole>;
    sub: Array<Scalars['String']['output']>;
    tenants?: Maybe<Array<UserTenantRole>>;
    tocReadAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserPreferencesArgs = {
    tenantId?: InputMaybe<Scalars['ID']['input']>;
};

export type UserRoleArgs = {
    tenantId: Scalars['ID']['input'];
};

export type UserMetrics = {
    __typename?: 'UserMetrics';
    count: Scalars['Int']['output'];
};

export type UserMetricsCountArgs = {
    role?: InputMaybe<UserRoles>;
};

export type UserMutations = {
    __typename?: 'UserMutations';
    addTenants: Array<UserTenantRole>;
    create: User;
    delete: Scalars['Int']['output'];
    generateAccessToken: AccessToken;
    grantAdminRights: User;
    removeTenants?: Maybe<Array<UserTenantRole>>;
    revokeAdminRights: User;
    update: User;
};

export type UserMutationsAddTenantsArgs = {
    roles: Array<TenantRoleInput>;
    userId: Scalars['ID']['input'];
};

export type UserMutationsCreateArgs = {
    input: CreateUserInput;
};

export type UserMutationsDeleteArgs = {
    id: Scalars['ID']['input'];
};

export type UserMutationsGenerateAccessTokenArgs = {
    input: CreateAccessTokenInput;
    userId: Scalars['ID']['input'];
};

export type UserMutationsGrantAdminRightsArgs = {
    userId: Scalars['ID']['input'];
};

export type UserMutationsRemoveTenantsArgs = {
    tenantIds: Array<Scalars['ID']['input']>;
    userId: Scalars['ID']['input'];
};

export type UserMutationsRevokeAdminRightsArgs = {
    userId: Scalars['ID']['input'];
};

export type UserMutationsUpdateArgs = {
    id: Scalars['ID']['input'];
    input?: InputMaybe<UpdateUserInput>;
};

export type UserQueries = {
    __typename?: 'UserQueries';
    dev_search?: Maybe<Array<User>>;
    get?: Maybe<User>;
    getMany: Array<User>;
    me?: Maybe<User>;
};

export type UserQueriesDev_SearchArgs = {
    email?: InputMaybe<Scalars['String']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
};

export type UserQueriesGetArgs = {
    id: Scalars['ID']['input'];
};

export enum UserRole {
    Custom = 'custom',
    TenantAdmin = 'tenantAdmin',
    User = 'user',
}

export type UserRoleInput = {
    role: UserRole;
    userId: Scalars['ID']['input'];
};

export enum UserRoles {
    TenantAdmin = 'TenantAdmin',
    User = 'User',
}

export type UserTenantRole = {
    __typename?: 'UserTenantRole';
    role: Scalars['String']['output'];
    roleName: Scalars['String']['output'];
    tenant: Tenant;
    tenantId: Scalars['ID']['output'];
    user: User;
    userId: Scalars['ID']['output'];
};

export type VatType = {
    __typename?: 'VatType';
    createdAt: Scalars['DateTime']['output'];
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    percent: Scalars['Float']['output'];
    tenantId: Scalars['ID']['output'];
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type VatTypeMutations = {
    __typename?: 'VatTypeMutations';
    create: VatType;
    delete: Scalars['Int']['output'];
    update: VatType;
};

export type VatTypeMutationsCreateArgs = {
    input: CreateVatTypeInput;
};

export type VatTypeMutationsDeleteArgs = {
    id: Scalars['ID']['input'];
};

export type VatTypeMutationsUpdateArgs = {
    id: Scalars['ID']['input'];
    input: UpdateVatTypeInput;
};

export type VersionInfo = {
    __typename?: 'VersionInfo';
    apiVersion: Scalars['String']['output'];
    commitSha: Scalars['String']['output'];
};

export enum VersionLabel {
    Current = 'current',
    Draft = 'draft',
    Published = 'published',
}

export type VersionedRecordInfo = {
    __typename?: 'VersionedRecordInfo';
    createdAt: Scalars['DateTime']['output'];
    id?: Maybe<Scalars['ID']['output']>;
    label: VersionLabel;
    owner?: Maybe<Owner>;
};

export type VersionedServices = {
    __typename?: 'VersionedServices';
    core: VersionInfo;
    federated: Scalars['Boolean']['output'];
    metrics?: Maybe<VersionInfo>;
    reporting?: Maybe<VersionInfo>;
    search?: Maybe<VersionInfo>;
    subscriptions?: Maybe<VersionInfo>;
};

export type Video = {
    __typename?: 'Video';
    id: Scalars['String']['output'];
    playlist?: Maybe<Scalars['String']['output']>;
    playlists?: Maybe<Array<Scalars['String']['output']>>;
    thumbnails?: Maybe<Array<Image>>;
    title?: Maybe<Scalars['String']['output']>;
};

export type VideoPlaylistArgs = {
    type: Scalars['String']['input'];
};

export type VideoContent = {
    __typename?: 'VideoContent';
    videos?: Maybe<Array<Video>>;
};

export type VideoInput = {
    key: Scalars['String']['input'];
    thumbnails?: InputMaybe<Array<ImageInput>>;
    title?: InputMaybe<Scalars['String']['input']>;
};

export type VideoMutations = {
    __typename?: 'VideoMutations';
    addPlaylists: Video;
};

export type VideoMutationsAddPlaylistsArgs = {
    keys: Array<Scalars['String']['input']>;
    videoId: Scalars['String']['input'];
};

export type VideosComponentConfig = {
    __typename?: 'VideosComponentConfig';
    multilingual?: Maybe<Scalars['Boolean']['output']>;
};

export type VideosComponentConfigInput = {
    multilingual?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Webhook = {
    __typename?: 'Webhook';
    concern: Scalars['String']['output'];
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    event: Scalars['String']['output'];
    graphqlQuery?: Maybe<Scalars['String']['output']>;
    headers?: Maybe<Array<WebhookHeader>>;
    id: Scalars['ID']['output'];
    lastInvocation?: Maybe<WebhookInvocation>;
    method: HttpMethod;
    name: Scalars['String']['output'];
    pastInvocations?: Maybe<Array<WebhookInvocation>>;
    tenant?: Maybe<Tenant>;
    tenantId: Scalars['ID']['output'];
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
    url: Scalars['String']['output'];
};

export type WebhookPastInvocationsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
};

export type WebhookHeader = {
    __typename?: 'WebhookHeader';
    name: Scalars['String']['output'];
    value: Scalars['String']['output'];
};

export type WebhookHeaderInput = {
    name: Scalars['String']['input'];
    value: Scalars['String']['input'];
};

export type WebhookInvocation = {
    __typename?: 'WebhookInvocation';
    end?: Maybe<Scalars['DateTime']['output']>;
    payload?: Maybe<Scalars['JSON']['output']>;
    response?: Maybe<WebhookInvocationResponse>;
    start?: Maybe<Scalars['DateTime']['output']>;
};

export type WebhookInvocationResponse = {
    __typename?: 'WebhookInvocationResponse';
    body?: Maybe<Scalars['JSON']['output']>;
    status?: Maybe<Scalars['Int']['output']>;
};

export type WebhookMetrics = IObjectMetrics & {
    __typename?: 'WebhookMetrics';
    count: Scalars['Int']['output'];
};

export type WebhookMetricsCountArgs = {
    end?: InputMaybe<Scalars['DateTime']['input']>;
    start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type WebhookMutations = {
    __typename?: 'WebhookMutations';
    create: Webhook;
    /** @deprecated This internal use only mutation has been deprecated and will can no longer be used to register webhook invocations. */
    delete: Scalars['Int']['output'];
    registerInvocation: WebhookInvocation;
    update: Webhook;
};

export type WebhookMutationsCreateArgs = {
    input: CreateWebhookInput;
};

export type WebhookMutationsDeleteArgs = {
    id: Scalars['ID']['input'];
};

export type WebhookMutationsRegisterInvocationArgs = {
    input?: InputMaybe<CreateWebhookInvocationInput>;
    webhookId: Scalars['ID']['input'];
};

export type WebhookMutationsUpdateArgs = {
    id: Scalars['ID']['input'];
    input: UpdateWebhookInput;
};

export type WebhookQueries = {
    __typename?: 'WebhookQueries';
    get?: Maybe<Webhook>;
    getMany?: Maybe<Array<Webhook>>;
};

export type WebhookQueriesGetArgs = {
    id: Scalars['ID']['input'];
};

export type WebhookQueriesGetManyArgs = {
    concern?: InputMaybe<Scalars['String']['input']>;
    event?: InputMaybe<Scalars['String']['input']>;
    tenantId: Scalars['ID']['input'];
};
