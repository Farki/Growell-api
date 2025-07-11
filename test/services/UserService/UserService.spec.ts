import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import UserService from '../../../src/services/UserService/UserService';
import { NotFoundError } from '../../../src/errors/NotFoundError';

describe('UserService', () => {
  // Mock logger
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  };

  let userService: UserService;

  beforeEach(() => {
    jest.clearAllMocks();
    userService = new UserService(mockLogger as any);
  });

  describe('getUserContexts', () => {
    it('should return active contexts for an existing user', () => {
      const userName = 'xnovj01';
      const result = userService.getUserContexts(userName);

      expect(result).toHaveLength(2); // There are 2 active contexts for xnovj01
      expect(result[0].userName).toBe(userName);
      expect(result[1].userName).toBe(userName);
      expect(result[0].contextIsActive).toBe(true);
      expect(result[1].contextIsActive).toBe(true);

      // Verify features transformation for first context
      expect(result[0].features).toEqual({
        'feat1': ['create', 'view'],
        'feat2': ['view']
      });

      // Verify features transformation for second context
      expect(result[1].features).toEqual({
        'feat1': ['create', 'view'],
        'feat2': ['view', 'create', 'delete']
      });
    });

    it('should throw NotFoundError when user does not exist', () => {
      const nonExistentUser = 'nonExistentUser';

      expect(() => {
        userService.getUserContexts(nonExistentUser);
      }).toThrow(NotFoundError);

      expect(() => {
        userService.getUserContexts(nonExistentUser);
      }).toThrow('User not found');
    });

    it('should return only active contexts', () => {
      const userName = 'xkuda02';
      const result = userService.getUserContexts(userName);

      expect(result).toHaveLength(1); // Only one active context for xkuda02
      expect(result[0].userName).toBe(userName);
      expect(result[0].contextIsActive).toBe(true);
      expect(result[0].contextId).toBe('ctx3');

      // Verify features transformation
      expect(result[0].features).toEqual({
        'feat1': ['view'],
        'feat2': ['view', 'edit']
      });
    });

    it('should handle undefined username correctly', () => {
      expect(() => {
        userService.getUserContexts(undefined);
      }).toThrow(NotFoundError);

      expect(() => {
        userService.getUserContexts(undefined);
      }).toThrow('User not found');
    });
  });
});
