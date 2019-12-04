import { TestBed, async } from '@angular/core/testing';

import { MensagemService } from './mensagem.service';
import { LoadingController } from '@ionic/angular'
import { dismiss } from '@ionic/core/dist/types/utils/overlays';

describe('MensagemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MensagemService = TestBed.get(MensagemService);
    expect(service).toBeTruthy();
  });
});

