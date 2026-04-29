import { Page, Locator, expect } from '@playwright/test';

/** Type-safe button names for autocomplete */
export type ButtonName = 'toggleNavigationBarButton' | 'searchKButton';

/** Type-safe link names for autocomplete */
export type LinkName = 'skipToMainContentLink' | 'playwrightLink' | 'typescriptLink' | 'pythonLink' | 'netLink' | 'javaLink' | 'getStartedLink' | 'starLink' | 'eightysixkLink' | 'testingDocumentationLink' | 'cliDocumentationLink' | 'mcpDocumentationLink' | 'modelContextProtocolLink' | 'testGeneratorLink' | 'traceViewerLink' | 'vsCodeExtensionLink' | 'mainPythonLink' | 'mainNetLink' | 'mainJavaLink' | 'codeLink' | 'bingLink' | 'outlookLink' | 'wwwLink' | 'githubLink' | 'mainGithubLink' | 'mainGithubLink1' | 'mainGithubLink2' | 'accessibilityinsightsLink' | 'gettingStartedLink' | 'playwrightTrainingLink' | 'learnVideosLink' | 'featureVideosLink' | 'stackOverflowLink' | 'discordLink' | 'twitterLink' | 'linkedinLink' | 'footerGithubLink' | 'youtubeLink' | 'blogLink' | 'ambassadorsLink' | 'microsoftPrivacyStatementLink';

/**
 * Page Object Model for Fast and reliable end-to-end testing for modern web apps | Playwright
 * @page /
 */
export class FastAndReliable {
  readonly page: Page;

  // ============ Configuration ============

  private readonly CONFIG = {
    PAGE_PATH: '/',
    TIMEOUTS: {
      PAGE_LOAD: 10000,
      ELEMENT_VISIBLE: 2000,
      NAVIGATION: 30000
    }
  } as const;

  constructor(page: Page) {
    this.page = page;
  }

  // ============ Private Helpers ============

  /**
   * Check if an element is visible on the page
   * @private
   */
  private async isVisible(locator: Locator, timeout = this.CONFIG.TIMEOUTS.ELEMENT_VISIBLE): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  // ============ Navigation Elements ============

  /**
   * Toggle navigation bar button
   * @locator locator('nav').getByRole('button')
   * @example await page.toggleNavigationBarButton.click();
   */
  get toggleNavigationBarButton(): Locator {
    return this.page.locator('nav').getByRole('button');
  }

  /**
   * Playwright link
   * @locator getByRole('link', { name: /Playwright/i })
   * @example await page.playwrightLink.click();
   */
  get playwrightLink(): Locator {
    return this.page.getByRole('link', { name: /Playwright/i });
  }

  /**
   * Search (Command+K) button
   * @locator getByRole('button', { name: /Search⌘K/i })
   * @example await page.searchKButton.click();
   */
  get searchKButton(): Locator {
    return this.page.getByRole('button', { name: /Search⌘K/i });
  }


  // ============ Header Elements ============

  /**
   * TypeScript link
   * @locator getByRole('link', { name: 'TypeScript' })
   * @example await page.typescriptLink.click();
   */
  get typescriptLink(): Locator {
    return this.page.getByRole('link', { name: 'TypeScript' });
  }

  /**
   * Python link
   * @locator getByRole('link', { name: /Python/i })
   * @example await page.pythonLink.click();
   */
  get pythonLink(): Locator {
    return this.page.getByRole('link', { name: /Python/i });
  }

  /**
   * .NET link
   * @locator getByRole('link', { name: /\.NET/i })
   * @example await page.netLink.click();
   */
  get netLink(): Locator {
    return this.page.getByRole('link', { name: /\.NET/i });
  }

  /**
   * Java link
   * @locator getByRole('link', { name: /Java/i })
   * @example await page.javaLink.click();
   */
  get javaLink(): Locator {
    return this.page.getByRole('link', { name: /Java/i });
  }

  /**
   * Get started link
   * @locator getByRole('link', { name: 'Get started' })
   * @example await page.getStartedLink.click();
   */
  get getStartedLink(): Locator {
    return this.page.getByRole('link', { name: 'Get started' });
  }

  /**
   * Star microsoft/playwright on GitHub link
   * @locator getByRole('link', { name: 'Star' })
   * @example await page.starLink.click();
   */
  get starLink(): Locator {
    return this.page.getByRole('link', { name: 'Star' });
  }

  /**
   * 86k+ stargazers on GitHub link
   * @locator getByRole('link', { name: '86k+' })
   * @example await page.eightysixkLink.click();
   */
  get eightysixkLink(): Locator {
    return this.page.getByRole('link', { name: '86k+' });
  }


  // ============ Footer ============

  /** Grouped footer locators */
  readonly footer = {
    /** Getting started */
    gettingStarted: () => this.page.locator('footer').getByRole('link', { name: 'Getting started' }),
    /** Playwright Training */
    playwrightTraining: () => this.page.locator('footer').getByRole('link', { name: 'Playwright Training' }),
    /** Learn Videos */
    learnVideos: () => this.page.locator('footer').getByRole('link', { name: 'Learn Videos' }),
    /** Feature Videos */
    featureVideos: () => this.page.locator('footer').getByRole('link', { name: 'Feature Videos' }),
    /** Stack Overflow */
    stackOverflow: () => this.page.locator('footer').getByRole('link', { name: 'Stack Overflow' }),
    /** Discord */
    discord: () => this.page.locator('footer').getByRole('link', { name: 'Discord' }),
    /** Twitter */
    twitter: () => this.page.locator('footer').getByRole('link', { name: 'Twitter' }),
    /** LinkedIn */
    linkedin: () => this.page.locator('footer').getByRole('link', { name: 'LinkedIn' }),
    /** GitHub */
    footerGithub: () => this.page.locator('footer').getByRole('link', { name: 'GitHub' }),
    /** YouTube */
    youtube: () => this.page.locator('footer').getByRole('link', { name: 'YouTube' }),
    /** Blog */
    blog: () => this.page.locator('footer').getByRole('link', { name: 'Blog' }),
    /** Ambassadors */
    ambassadors: () => this.page.locator('footer').getByRole('link', { name: 'Ambassadors' }),
    /** Microsoft Privacy Statement */
    microsoftPrivacyStatement: () => this.page.locator('footer').getByRole('link', { name: 'Microsoft Privacy Statement' })
  } as const;

  // ============ Main Elements ============

  /**
   * Skip to main content link
   * @locator getByRole('link', { name: 'Skip to main content' })
   * @example await page.skipToMainContentLink.click();
   */
  get skipToMainContentLink(): Locator {
    return this.page.getByRole('link', { name: 'Skip to main content' });
  }

  /**
   * Testing documentation link
   * @locator getByRole('link', { name: 'Testing documentation' })
   * @example await page.testingDocumentationLink.click();
   */
  get testingDocumentationLink(): Locator {
    return this.page.getByRole('link', { name: 'Testing documentation' });
  }

  /**
   * CLI documentation link
   * @locator getByRole('link', { name: 'CLI documentation' })
   * @example await page.cliDocumentationLink.click();
   */
  get cliDocumentationLink(): Locator {
    return this.page.getByRole('link', { name: 'CLI documentation' });
  }

  /**
   * MCP documentation link
   * @locator getByRole('link', { name: 'MCP documentation' })
   * @example await page.mcpDocumentationLink.click();
   */
  get mcpDocumentationLink(): Locator {
    return this.page.getByRole('link', { name: 'MCP documentation' });
  }

  /**
   * Model Context Protocol link
   * @locator getByRole('link', { name: 'Model Context Protocol' })
   * @example await page.modelContextProtocolLink.click();
   */
  get modelContextProtocolLink(): Locator {
    return this.page.getByRole('link', { name: 'Model Context Protocol' });
  }

  /**
   * Test generator link
   * @locator getByRole('link', { name: 'Test generator' })
   * @example await page.testGeneratorLink.click();
   */
  get testGeneratorLink(): Locator {
    return this.page.getByRole('link', { name: 'Test generator' });
  }

  /**
   * Trace Viewer link
   * @locator getByRole('link', { name: 'Trace Viewer' })
   * @example await page.traceViewerLink.click();
   */
  get traceViewerLink(): Locator {
    return this.page.getByRole('link', { name: 'Trace Viewer' });
  }

  /**
   * VS Code extension link
   * @locator getByRole('link', { name: 'VS Code extension' })
   * @example await page.vsCodeExtensionLink.click();
   */
  get vsCodeExtensionLink(): Locator {
    return this.page.getByRole('link', { name: 'VS Code extension' });
  }

  /**
   * Python link
   * @locator getByRole('link', { name: /Python/i })
   * @example await page.mainPythonLink.click();
   */
  get mainPythonLink(): Locator {
    return this.page.getByRole('link', { name: /Python/i });
  }

  /**
   * .NET link
   * @locator getByRole('link', { name: /\.NET/i })
   * @example await page.mainNetLink.click();
   */
  get mainNetLink(): Locator {
    return this.page.getByRole('link', { name: /\.NET/i });
  }

  /**
   * Java link
   * @locator getByRole('link', { name: /Java/i })
   * @example await page.mainJavaLink.click();
   */
  get mainJavaLink(): Locator {
    return this.page.getByRole('link', { name: /Java/i });
  }

  /**
   * Link
   * @locator locator('a').nth(38)
   * @example await page.codeLink.click();
   */
  get codeLink(): Locator {
    return this.page.locator('a').nth(38);
  }

  /**
   * Link
   * @locator locator('a').nth(39)
   * @example await page.bingLink.click();
   */
  get bingLink(): Locator {
    return this.page.locator('a').nth(39);
  }

  /**
   * Link
   * @locator locator('a').nth(40)
   * @example await page.outlookLink.click();
   */
  get outlookLink(): Locator {
    return this.page.locator('a').nth(40);
  }

  /**
   * Link
   * @locator locator('a').nth(41)
   * @example await page.wwwLink.click();
   */
  get wwwLink(): Locator {
    return this.page.locator('a').nth(41);
  }

  /**
   * Link
   * @locator locator('a').nth(42)
   * @example await page.githubLink.click();
   */
  get githubLink(): Locator {
    return this.page.locator('a').nth(42);
  }

  /**
   * Link
   * @locator locator('a').nth(43)
   * @example await page.mainGithubLink.click();
   */
  get mainGithubLink(): Locator {
    return this.page.locator('a').nth(43);
  }

  /**
   * Link
   * @locator locator('a').nth(44)
   * @example await page.mainGithubLink1.click();
   */
  get mainGithubLink1(): Locator {
    return this.page.locator('a').nth(44);
  }

  /**
   * Link
   * @locator locator('a').nth(45)
   * @example await page.mainGithubLink2.click();
   */
  get mainGithubLink2(): Locator {
    return this.page.locator('a').nth(45);
  }

  /**
   * Link
   * @locator locator('a').nth(46)
   * @example await page.accessibilityinsightsLink.click();
   */
  get accessibilityinsightsLink(): Locator {
    return this.page.locator('a').nth(46);
  }


  // ============ Delegate Getters (for grouped elements) ============

  /** Delegate getter for footer.gettingStarted() */
  get gettingStartedLink(): Locator {
    return this.footer.gettingStarted();
  }

  /** Delegate getter for footer.playwrightTraining() */
  get playwrightTrainingLink(): Locator {
    return this.footer.playwrightTraining();
  }

  /** Delegate getter for footer.learnVideos() */
  get learnVideosLink(): Locator {
    return this.footer.learnVideos();
  }

  /** Delegate getter for footer.featureVideos() */
  get featureVideosLink(): Locator {
    return this.footer.featureVideos();
  }

  /** Delegate getter for footer.stackOverflow() */
  get stackOverflowLink(): Locator {
    return this.footer.stackOverflow();
  }

  /** Delegate getter for footer.discord() */
  get discordLink(): Locator {
    return this.footer.discord();
  }

  /** Delegate getter for footer.twitter() */
  get twitterLink(): Locator {
    return this.footer.twitter();
  }

  /** Delegate getter for footer.linkedin() */
  get linkedinLink(): Locator {
    return this.footer.linkedin();
  }

  /** Delegate getter for footer.footerGithub() */
  get footerGithubLink(): Locator {
    return this.footer.footerGithub();
  }

  /** Delegate getter for footer.youtube() */
  get youtubeLink(): Locator {
    return this.footer.youtube();
  }

  /** Delegate getter for footer.blog() */
  get blogLink(): Locator {
    return this.footer.blog();
  }

  /** Delegate getter for footer.ambassadors() */
  get ambassadorsLink(): Locator {
    return this.footer.ambassadors();
  }

  /** Delegate getter for footer.microsoftPrivacyStatement() */
  get microsoftPrivacyStatementLink(): Locator {
    return this.footer.microsoftPrivacyStatement();
  }


  // ============ Actions ============

  async clickButton(buttonName: ButtonName): Promise<void> {
    const buttonMap: Record<ButtonName, Locator> = {
      'toggleNavigationBarButton': this.toggleNavigationBarButton,
      'searchKButton': this.searchKButton,
    };
    const button = buttonMap[buttonName];
    if(!button) throw new Error(`Button '${buttonName}' not found`);
    await button.click();
  }

  async clickLink(linkName: LinkName): Promise<void> {
    const linkMap: Record<LinkName, Locator> = {
      'skipToMainContentLink': this.skipToMainContentLink,
      'playwrightLink': this.playwrightLink,
      'typescriptLink': this.typescriptLink,
      'pythonLink': this.pythonLink,
      'netLink': this.netLink,
      'javaLink': this.javaLink,
      'getStartedLink': this.getStartedLink,
      'starLink': this.starLink,
      'eightysixkLink': this.eightysixkLink,
      'testingDocumentationLink': this.testingDocumentationLink,
      'cliDocumentationLink': this.cliDocumentationLink,
      'mcpDocumentationLink': this.mcpDocumentationLink,
      'modelContextProtocolLink': this.modelContextProtocolLink,
      'testGeneratorLink': this.testGeneratorLink,
      'traceViewerLink': this.traceViewerLink,
      'vsCodeExtensionLink': this.vsCodeExtensionLink,
      'mainPythonLink': this.mainPythonLink,
      'mainNetLink': this.mainNetLink,
      'mainJavaLink': this.mainJavaLink,
      'codeLink': this.codeLink,
      'bingLink': this.bingLink,
      'outlookLink': this.outlookLink,
      'wwwLink': this.wwwLink,
      'githubLink': this.githubLink,
      'mainGithubLink': this.mainGithubLink,
      'mainGithubLink1': this.mainGithubLink1,
      'mainGithubLink2': this.mainGithubLink2,
      'accessibilityinsightsLink': this.accessibilityinsightsLink,
      'gettingStartedLink': this.gettingStartedLink,
      'playwrightTrainingLink': this.playwrightTrainingLink,
      'learnVideosLink': this.learnVideosLink,
      'featureVideosLink': this.featureVideosLink,
      'stackOverflowLink': this.stackOverflowLink,
      'discordLink': this.discordLink,
      'twitterLink': this.twitterLink,
      'linkedinLink': this.linkedinLink,
      'footerGithubLink': this.footerGithubLink,
      'youtubeLink': this.youtubeLink,
      'blogLink': this.blogLink,
      'ambassadorsLink': this.ambassadorsLink,
      'microsoftPrivacyStatementLink': this.microsoftPrivacyStatementLink,
    };
    const link = linkMap[linkName];
    if(!link) throw new Error(`Link '${linkName}' not found`);
    await link.click();
  }


  // ============ Assertions ============

  /** Verify page has loaded successfully */
  async expectPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\//);
    await expect(this.skipToMainContentLink).toBeVisible({ timeout: 10000 });
  }

  /** Verify all interactive buttons are visible */
  async expectAllButtonsVisible(): Promise<void> {
    await expect(this.toggleNavigationBarButton).toBeVisible();
    await expect(this.searchKButton).toBeVisible();
  }

  /**
   * Verify specific element is visible
   * @param locator - Element locator to check
   */
  async expectElementVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }


  // ============ State Checks (Priority 3: Complete coverage) ============

  /**
   * Check if Skip to main content is visible
   */
  async isSkipToMainContentLinkVisible(): Promise<boolean> {
    return this.isVisible(this.skipToMainContentLink);
  }

  /**
   * Check if Toggle navigation bar is visible
   */
  async isToggleNavigationBarButtonVisible(): Promise<boolean> {
    return this.isVisible(this.toggleNavigationBarButton);
  }

  /**
   * Check if Playwright is visible
   */
  async isPlaywrightLinkVisible(): Promise<boolean> {
    return this.isVisible(this.playwrightLink);
  }

  /**
   * Check if Search (Command+K) is visible
   */
  async isSearchKButtonVisible(): Promise<boolean> {
    return this.isVisible(this.searchKButton);
  }

  /**
   * Check if TypeScript is visible
   */
  async isTypescriptLinkVisible(): Promise<boolean> {
    return this.isVisible(this.typescriptLink);
  }

  /**
   * Check if Python is visible
   */
  async isPythonLinkVisible(): Promise<boolean> {
    return this.isVisible(this.pythonLink);
  }

  /**
   * Check if .NET is visible
   */
  async isNetLinkVisible(): Promise<boolean> {
    return this.isVisible(this.netLink);
  }

  /**
   * Check if Java is visible
   */
  async isJavaLinkVisible(): Promise<boolean> {
    return this.isVisible(this.javaLink);
  }

  /**
   * Check if Get started is visible
   */
  async isGetStartedLinkVisible(): Promise<boolean> {
    return this.isVisible(this.getStartedLink);
  }

  /**
   * Check if Star microsoft/playwright on GitHub is visible
   */
  async isStarLinkVisible(): Promise<boolean> {
    return this.isVisible(this.starLink);
  }

  /**
   * Check if 86k+ stargazers on GitHub is visible
   */
  async isEightysixkLinkVisible(): Promise<boolean> {
    return this.isVisible(this.eightysixkLink);
  }

  /**
   * Check if Testing documentation is visible
   */
  async isTestingDocumentationLinkVisible(): Promise<boolean> {
    return this.isVisible(this.testingDocumentationLink);
  }

  /**
   * Check if CLI documentation is visible
   */
  async isCliDocumentationLinkVisible(): Promise<boolean> {
    return this.isVisible(this.cliDocumentationLink);
  }

  /**
   * Check if MCP documentation is visible
   */
  async isMcpDocumentationLinkVisible(): Promise<boolean> {
    return this.isVisible(this.mcpDocumentationLink);
  }

  /**
   * Check if Model Context Protocol is visible
   */
  async isModelContextProtocolLinkVisible(): Promise<boolean> {
    return this.isVisible(this.modelContextProtocolLink);
  }

  /**
   * Check if Test generator is visible
   */
  async isTestGeneratorLinkVisible(): Promise<boolean> {
    return this.isVisible(this.testGeneratorLink);
  }

  /**
   * Check if Trace Viewer is visible
   */
  async isTraceViewerLinkVisible(): Promise<boolean> {
    return this.isVisible(this.traceViewerLink);
  }

  /**
   * Check if VS Code extension is visible
   */
  async isVsCodeExtensionLinkVisible(): Promise<boolean> {
    return this.isVisible(this.vsCodeExtensionLink);
  }

  /**
   * Check if Python is visible
   */
  async isMainPythonLinkVisible(): Promise<boolean> {
    return this.isVisible(this.mainPythonLink);
  }

  /**
   * Check if .NET is visible
   */
  async isMainNetLinkVisible(): Promise<boolean> {
    return this.isVisible(this.mainNetLink);
  }

  /**
   * Check if Java is visible
   */
  async isMainJavaLinkVisible(): Promise<boolean> {
    return this.isVisible(this.mainJavaLink);
  }

  /**
   * Check if codeLink is visible
   */
  async isCodeLinkVisible(): Promise<boolean> {
    return this.isVisible(this.codeLink);
  }

  /**
   * Check if bingLink is visible
   */
  async isBingLinkVisible(): Promise<boolean> {
    return this.isVisible(this.bingLink);
  }

  /**
   * Check if outlookLink is visible
   */
  async isOutlookLinkVisible(): Promise<boolean> {
    return this.isVisible(this.outlookLink);
  }

  /**
   * Check if wwwLink is visible
   */
  async isWwwLinkVisible(): Promise<boolean> {
    return this.isVisible(this.wwwLink);
  }

  /**
   * Check if githubLink is visible
   */
  async isGithubLinkVisible(): Promise<boolean> {
    return this.isVisible(this.githubLink);
  }

  /**
   * Check if mainGithubLink is visible
   */
  async isMainGithubLinkVisible(): Promise<boolean> {
    return this.isVisible(this.mainGithubLink);
  }

  /**
   * Check if mainGithubLink is visible
   */
  async isMainGithubLink1Visible(): Promise<boolean> {
    return this.isVisible(this.mainGithubLink1);
  }

  /**
   * Check if mainGithubLink is visible
   */
  async isMainGithubLink2Visible(): Promise<boolean> {
    return this.isVisible(this.mainGithubLink2);
  }

  /**
   * Check if accessibilityinsightsLink is visible
   */
  async isAccessibilityinsightsLinkVisible(): Promise<boolean> {
    return this.isVisible(this.accessibilityinsightsLink);
  }

  /**
   * Check if Getting started is visible
   */
  async isGettingStartedLinkVisible(): Promise<boolean> {
    return this.isVisible(this.gettingStartedLink);
  }

  /**
   * Check if Playwright Training is visible
   */
  async isPlaywrightTrainingLinkVisible(): Promise<boolean> {
    return this.isVisible(this.playwrightTrainingLink);
  }

  /**
   * Check if Learn Videos is visible
   */
  async isLearnVideosLinkVisible(): Promise<boolean> {
    return this.isVisible(this.learnVideosLink);
  }

  /**
   * Check if Feature Videos is visible
   */
  async isFeatureVideosLinkVisible(): Promise<boolean> {
    return this.isVisible(this.featureVideosLink);
  }

  /**
   * Check if Stack Overflow is visible
   */
  async isStackOverflowLinkVisible(): Promise<boolean> {
    return this.isVisible(this.stackOverflowLink);
  }

  /**
   * Check if Discord is visible
   */
  async isDiscordLinkVisible(): Promise<boolean> {
    return this.isVisible(this.discordLink);
  }

  /**
   * Check if Twitter is visible
   */
  async isTwitterLinkVisible(): Promise<boolean> {
    return this.isVisible(this.twitterLink);
  }

  /**
   * Check if LinkedIn is visible
   */
  async isLinkedinLinkVisible(): Promise<boolean> {
    return this.isVisible(this.linkedinLink);
  }

  /**
   * Check if GitHub is visible
   */
  async isFooterGithubLinkVisible(): Promise<boolean> {
    return this.isVisible(this.footerGithubLink);
  }

  /**
   * Check if YouTube is visible
   */
  async isYoutubeLinkVisible(): Promise<boolean> {
    return this.isVisible(this.youtubeLink);
  }

  /**
   * Check if Blog is visible
   */
  async isBlogLinkVisible(): Promise<boolean> {
    return this.isVisible(this.blogLink);
  }

  /**
   * Check if Ambassadors is visible
   */
  async isAmbassadorsLinkVisible(): Promise<boolean> {
    return this.isVisible(this.ambassadorsLink);
  }

  /**
   * Check if Microsoft Privacy Statement is visible
   */
  async isMicrosoftPrivacyStatementLinkVisible(): Promise<boolean> {
    return this.isVisible(this.microsoftPrivacyStatementLink);
  }

  // ============ Navigation ============

  /**
   * Navigate to the page
   * @param baseUrl - Optional base URL override (defaults to env variable)
   * @example
   * // Use environment variable
   * await page.goto();
   * // Or override
   * await page.goto('https://staging.example.com');
   */
  async goto(baseUrl?: string): Promise<void> {
    const url = baseUrl || process.env.BASE_URL || 'https://playwright.dev/';
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
